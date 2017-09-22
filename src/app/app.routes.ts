import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import {UserCanLoadGuard} from "./shared/can.service"




const APP_Routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'user/:id', loadChildren: 'app/user/user-main/user-main.module#userMainModule', },
  { path: 'manager', loadChildren: 'app/manager/manager-main/manager-main.module#managerMainModule', }

];

export const routes = RouterModule.forRoot(APP_Routes);

