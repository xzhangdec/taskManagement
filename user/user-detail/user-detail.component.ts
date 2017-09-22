import { Component,OnInit,OnDestroy } from '@angular/core';
import { UserService }   from '../../shared/user.service';

import {ActivatedRoute, Router} from "@angular/router";

import {Subscription} from "rxjs/Subscription";


import {User} from "../../shared/user.model";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls:['./user-detail.component.css']

})
export class UserDetailComponent implements OnInit,OnDestroy{
  private selectedUser:User;
  private subscribe:Subscription = new Subscription();
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private heroService:UserService){}

  values(obj) : Array<string> {
    return Object.keys(obj).map(e => obj[e]);
  }

  ngOnInit(){
    this.subscribe = this.activatedRoute.queryParams.subscribe((queryParams)=>{
      console.log('in detail:'+queryParams['id']);
      if(this.heroService.getUserById(queryParams['id'])!=null){
        this.selectedUser = this.heroService.getUserById(queryParams['id']);
        console.log(this.selectedUser);
      }
    });
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  onClick(){
    this.router.navigate(['/main/user']);
  }
}
