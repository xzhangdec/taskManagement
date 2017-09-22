import { NgModule }      from '@angular/core';
import { SharedModule} from '../shared/shared.module';

import { TaskDetailComponent }   from './task-detail/task-detail.component';
import { TaskFormComponent }   from './task-form/task-form.component';
import { TaskComponent } from './task.component';

@NgModule({
  imports:      [ SharedModule],
  declarations: [ TaskComponent,TaskFormComponent,TaskDetailComponent ],
  exports:      [ TaskComponent ]
})
export class TaskModule { }
