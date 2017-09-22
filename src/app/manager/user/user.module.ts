import { NgModule }      from '@angular/core';
import { ManagerSharedModule} from '../../shared/shared.module';

import { UserDetailComponent }   from './user-detail/user-detail.component';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports:      [ ManagerSharedModule ],
  declarations: [ UserDetailComponent, UserComponent, UserFormComponent ],
  exports:      [ UserComponent ]
})
export class ManagerUserModule { }
