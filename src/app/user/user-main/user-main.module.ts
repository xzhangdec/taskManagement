import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserMainComponent } from './user-main.component';
import { NavComponent } from '../nav/nav.component';
import { AccountComponent } from '../account/account.component';
import { UserTaskModule } from '../task/task.module';
import {  ManagerSharedModule } from '../../shared/shared.module';

import { userRouting } from './user-main.routes';

@NgModule({
  imports: [ RouterModule,  ManagerSharedModule, UserTaskModule, userRouting ],
  declarations: [ NavComponent, AccountComponent, UserMainComponent ],
  exports: [ UserMainComponent ]

})

export class userMainModule { }

