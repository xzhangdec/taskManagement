import { NgModule } from '@angular/core';
import { ManagerSharedModule} from '../../shared/shared.module';

import { TaskDetailComponent }   from './task-detail/task-detail.component';
import { TaskFormComponent }   from './task-form/task-form.component';
import { TaskComponent } from './task.component';

@NgModule({
  imports:      [ ManagerSharedModule],
  declarations: [ TaskComponent,TaskFormComponent,TaskDetailComponent ],
  exports:      [ TaskComponent ]
})
export class ManagerTaskModule { }
