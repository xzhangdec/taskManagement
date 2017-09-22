import { NgModule }      from '@angular/core';
import { SharedModule} from '../shared/shared.module';

import {MainComponent} from "./main.component";
import { UserModule }   from '../user/user.module';
import { TaskModule }   from '../task/task.module';
import { RouterModule } from '@angular/router';

import { clickedDirective } from '../nav/clicked.directive';

import { ManageComponent }   from '../manage/manage.component';
import { NavComponent } from '../nav/nav.component';
import { routing } from './main.routes'


@NgModule({
  imports:      [ routing, UserModule, TaskModule,SharedModule, RouterModule],
  declarations: [ MainComponent, ManageComponent, NavComponent, clickedDirective],
  exports:      [ MainComponent]
})
export class MainModule { }
