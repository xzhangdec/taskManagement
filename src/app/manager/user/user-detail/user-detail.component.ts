import { Component,OnInit,OnDestroy } from '@angular/core';
import { UserService }   from '../../../shared/user.service';

import {ActivatedRoute, Router} from "@angular/router";

import {Subscription} from "rxjs/Subscription";


import {User} from "../../../shared/user.model";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls:['./user-detail.component.css']

})
export class UserDetailComponent implements OnInit,OnDestroy{
  private selectedUser:User;
  private subscribe:Subscription = new Subscription();
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private userService:UserService){}

  values(obj) : Array<string> {
    return Object.keys(obj).map(e => obj[e]);
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params)=> {
      this.userService.getUserById(params['id']).subscribe(user => {
        this.selectedUser = user;
        console.log(this.selectedUser);
      });
    })
  }


  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  onClick(){
    this.router.navigate(['/manager/user']);
  }
}
