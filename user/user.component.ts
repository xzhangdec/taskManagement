import { Component, OnInit } from '@angular/core';
import { UserService }   from '../shared/user.service';
import { Router } from "@angular/router";

import { ComponentCanDeactivate }  from '../shared/can.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { User } from "../shared/user.model";
import { UserFormComponent } from "./user-form/user-form.component";
import {ViewChild} from "@angular/core";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', './user.component.scss']
})
export class UserComponent implements OnInit {
  private displayStatus: string = 'none';
  private users: User[] = [];
  filteredUsers: User[];


  constructor(private userService: UserService, private router: Router){}
  @ViewChild(UserFormComponent)
  private userFormComponent: UserFormComponent;


  showDisplay() {
    this.displayStatus = 'block';
  }

  changeFormStatus(event) {
    console.log(2222);
    this.displayStatus = event;
  }

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsers = this.listFilter ? this.performFilter(this.listFilter) : this.users;
  }

  performFilter(filterBy: string): User[] {
    filterBy= filterBy.toLocaleLowerCase();
    return this.users.filter((user: User) =>
      user.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  ngOnInit() {
    this.users = this.userService.getUsers();
    this.filteredUsers = this.users;
  }

  delUser(id) {
    this.userService.deleteUserById(id);

  }


  //Get all users from the API
  getAllUsers(){
    console.log('!!!!!!!!!!!!!!!!! !!!!!!!getAll');
    this.userService.getUsersHttp().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

  navToHeroDetail(id:string){
    console.log(id);
    this.router.navigate(['/main/user/detail'], {queryParams:{'id':id}});
  }
  canDeactivate():boolean | Observable<boolean> {
    if(this.userFormComponent.myForm.valid || this.userFormComponent.myForm.pristine){
      return true;
    }
    return confirm("Form is not completed, Are you sure to leave?");
  }

}
