import {User} from "./user.model"
import {Injectable, OnInit, OnDestroy} from "@angular/core"
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs";

@Injectable()
export class UserService{
  public userList:Array<User> = [];
  private subscription:Subscription = new Subscription();

  private API = 'http://localhost:3000';

  constructor(private http:Http){
    console.log("User service start");
    this.subscription = this.getUsersHttp().subscribe((data)=>{
      for(var i in data){
        this.userList.push(new User(data[i].name, data[i].age, data[i].gender, data[i].imgUrl, data[i].address, data[i].city, data[i]._id));
        console.log(22222);
        console.log(this.userList);
      }
    },(err)=>{
      console.error("Get Users Err: " + err);
    });
  }

  getUsersHttp(): Observable<any>{
    return this.http.get(`${this.API}/users`).map((res: Response) => {
      let body = res.json();
      return body || { };
    })
  }


  getUsers():Array<User> {
    return this.userList;
  }

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

  createUser(newUser: User): Observable<any>{
    return this.http.post(`${this.API}/users`, newUser).map((res: Response) => {
      let body = res.json();
      return body || { };
    });
  }



  deleteUser(id): Observable<any>{
    return this.http.delete(`${this.API}/users/`+id).map((res: Response) => {
      let body = res.json();
      return body || { };
    });

  }

}
