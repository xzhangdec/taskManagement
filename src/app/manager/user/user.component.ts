import { Component, OnInit } from '@angular/core';
import { UserService }   from '../../shared/user.service';
import { Router } from "@angular/router";

import { ComponentCanDeactivate }  from '../../shared/can.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import {Subscription} from "rxjs/Subscription";
import { User } from "../../shared/user.model";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', './user.component.scss']
})
export class UserComponent implements OnInit {
  private displayStatus: string = 'none';
  private users: User[] = [];
  filteredUsers: User[];
  private subscription:Subscription = new Subscription();



  constructor(private userService: UserService, private router: Router){}


  showDisplay() {
    this.displayStatus = 'block';
  }

  changeFormStatus(event) {
    this.displayStatus = event;
  }

  refreshPage(event) {
    if (event) {
      return this.userService.getAllUsers().subscribe(users => {
        this.users = users;
        this.filteredUsers = users;
      });
    }
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
    this.getUsers();
  }


  delUser(id) {
    this.subscription =
      this.userService.delOneUser(id).subscribe(
      () => {
        this.getUsers();
      });
  }


  //Get all users from the API
  getUsers() {
    this.userService.getAllUsers().subscribe(users => {
      console.log(users);
      this.users = users;
      this.filteredUsers = users;
    });
  }

  navToHeroDetail(id:string){
    console.log(id);
    this.router.navigate(['/manager/user', id]);
  }


}
