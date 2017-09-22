import { NgModule } from '@angular/core';

import { ManagerSharedModule } from '../../shared/shared.module';
import { ManagerMainComponent } from './manager-main.component';
import { RouterModule } from '@angular/router';
import { ManagerTaskModule } from '../task/task.module';
import { ManagerUserModule } from '../user/user.module';
import { ManageComponent }   from '../manage/manage.component';
import { NavComponent } from '../nav/nav.component';

import { managerRouting } from './manager-main.routes'



@NgModule({
  imports:      [ managerRouting, ManagerTaskModule, ManagerUserModule, ManagerSharedModule, RouterModule],
  declarations: [ ManagerMainComponent, ManageComponent, NavComponent],
  exports:      [ ManagerMainComponent]
})

export class managerMainModule { }
