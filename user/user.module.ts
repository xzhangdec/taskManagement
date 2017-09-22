import { NgModule }      from '@angular/core';
import { SharedModule} from '../shared/shared.module';

import { UserDetailComponent }   from './user-detail/user-detail.component';
import { UserFormComponent }   from './user-form/user-form.component';
import { UserComponent } from './user.component';

@NgModule({
  imports:      [ SharedModule ],
  declarations: [ UserDetailComponent,UserFormComponent,UserComponent ],
  exports:      [ UserComponent ]
})
export class UserModule { }
