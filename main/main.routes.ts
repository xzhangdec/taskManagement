import {Routes, RouterModule} from "@angular/router";

import {MainComponent} from "./main.component";
import {UserComponent} from "../user/user.component";
import {UserDetailComponent} from "../user/user-detail/user-detail.component";
import {TaskComponent} from "../task/task.component";
import {TaskDetailComponent} from "../task/task-detail/task-detail.component";
import {ManageComponent} from "../manage/manage.component";
import {UserCanDeactivateGuard} from "../shared/can.service";

const MAIN_ROUTES: Routes = [
  { path:'', component: MainComponent, children:[
    { path:'', component: TaskComponent},
    { path:'user', component: UserComponent, canDeactivate:[UserCanDeactivateGuard]},
    { path:'user/detail', component: UserDetailComponent},
    { path:'task', component: TaskComponent, canDeactivate:[UserCanDeactivateGuard]},
    { path:'task/:id', component: TaskDetailComponent},
    { path:'manage', component: ManageComponent}
  ]}
];

export const routing = RouterModule.forChild(MAIN_ROUTES);
