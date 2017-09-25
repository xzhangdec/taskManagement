import {User} from "./user.model"
import {Injectable, OnInit, OnDestroy} from "@angular/core"
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';


@Injectable()
export class UserService{
  public userList:Array<User> = [];
  private subscription:Subscription = new Subscription();

  private API = 'http://localhost:3000';

  constructor(private http:Http){
    console.log("User service start");
    this.subscription = this.getAllUsers().subscribe((data)=>{
      for(var i in data){
        this.userList.push(new User(data[i].name, data[i].gender, data[i].imgUrl, data[i].name, data[i].title, data[i].address, data[i].phone, data[i].email, data[i]._id));
        console.log(22222);
        console.log(this.userList);
      }
    },(err)=>{
      console.error("Get Users Err: " + err);
    });
  }


  // add one user to DB
  addUser(newUser: User): Observable<any> {
    console.log(newUser);
    return this.http.post(`${this.API}/users`, newUser);
  }

  usersGet():Array<User> {
    return this.userList;
  }

  get_User_Id(id):User{
    for(let h of this.userList){
      if(id == h._id){
        return h;
      }
    }
    return null;
  }

  getUser_Phone(locate) {
    for(let u of this.userList){
      if(locate == (u.name+u.phone)){
        return u;
      }
    }
    return null;
  }

  delUser_List(locate) {
    for(let i in this.userList){
      if(locate == (this.userList[i].name+this.userList[i].phone)){
        this.userList.splice(parseInt(i), 1);
      }
    }
    return null;
  }

  getAllUsers(): Observable<any>{
    return this.http.get(`${this.API}/users`).map(res => res.json());
  }

  delOneUser(id) {
    return this.http.delete(`${this.API}/users/`+id).map(res => res.json());
  }

  getUserById(id) {
    return this.http.get(`${this.API}/users/`+id).map(res => res.json());
  }


/*
  deleteUserById(id:string) {
    for (let i in this.userList) {
      console.log(i);
      if (id == this.userList[i].id) {
        this.userList.splice(parseInt(i), 1);
      }
    }
    return this.userList;
  }

  getUserById(id):User{
    for(let h of this.userList){
      if(id == h.id){
        return h;
      }
    }
    return null;
  }
*/



  deleteUser(id): Observable<any>{
    return this.http.delete(`${this.API}/users/`+id).map((res: Response) => {
      let body = res.json();
      return body || { };
    });

  }

}
