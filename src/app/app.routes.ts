import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import {managerCanLoadGuard} from "./shared/auth.service";




const APP_Routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'user/:id', loadChildren: 'app/user/user-main/user-main.module#userMainModule', canLoad: [managerCanLoadGuard]},
  { path: 'manager', loadChildren: 'app/manager/manager-main/manager-main.module#managerMainModule', canLoad: [managerCanLoadGuard]}

];

export const routes = RouterModule.forRoot(APP_Routes);

