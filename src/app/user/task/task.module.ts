import { NgModule } from '@angular/core';
import { ManagerSharedModule } from '../../shared/shared.module'

import { TaskComponent } from './task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  imports: [ ManagerSharedModule ],
  declarations: [ TaskComponent, TaskDetailComponent ],
  exports: [ TaskComponent ]
})

export class UserTaskModule { }

