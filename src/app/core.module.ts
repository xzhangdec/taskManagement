import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule} from "@angular/forms";

import { UserService }   from './shared/user.service';
import { TaskService }   from './shared/task.service';
import { manager_AuthService, user_AuthService, managerCanLoadGuard }  from './shared/auth.service';


import {HttpModule} from "@angular/http";


@NgModule({
  imports:      [ CommonModule, FormsModule, HttpModule],
  declarations: [  ],
  providers: [ UserService, TaskService, manager_AuthService, user_AuthService, managerCanLoadGuard],
  exports: [  ]
})
export class CoreModule { }
