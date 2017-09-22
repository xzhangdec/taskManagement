import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule} from "@angular/forms";

import { UserService }   from './shared/user.service';
import { TaskService }   from './shared/task.service';
import { CanService,UserCanLoadGuard,UserCanDeactivateGuard }  from './shared/can.service';
import {HttpModule} from "@angular/http";


@NgModule({
  imports:      [ CommonModule, FormsModule, HttpModule],
  declarations: [  ],
  providers: [ UserService, TaskService, CanService,UserCanLoadGuard,UserCanDeactivateGuard ],
  exports: [  ]
})
export class CoreModule { }
