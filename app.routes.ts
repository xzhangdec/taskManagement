import {Routes, RouterModule} from "@angular/router";
import {AccountComponent} from "./account/account.component";
import {UserCanLoadGuard} from "./shared/can.service"


const APP_ROUTES: Routes = [
  { path:'', component: AccountComponent},
  { path:'account', component: AccountComponent},
  { path:'main', loadChildren:'app/main/main.module#MainModule', canLoad:[UserCanLoadGuard]},
  { path:'**', component: AccountComponent},
];

export const routes = RouterModule.forRoot(APP_ROUTES);
