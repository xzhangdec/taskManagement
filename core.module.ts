import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { AccountComponent }   from './account/account.component';
import { UserService }   from './shared/user.service';
import { TaskService }   from './shared/task.service';
import { CanService,UserCanLoadGuard,UserCanDeactivateGuard }  from './shared/can.service';
import {HttpModule} from "@angular/http";

@NgModule({
  imports:      [ CommonModule, ReactiveFormsModule, FormsModule, HttpModule],
  declarations: [ AccountComponent ],
  providers: [ UserService, TaskService, CanService ,UserCanLoadGuard,UserCanDeactivateGuard],
  exports: [ AccountComponent ],
})
export class CoreModule { }
