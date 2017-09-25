import { Routes, RouterModule } from "@angular/router";

import { ManagerMainComponent } from "./manager-main.component";
import { UserComponent } from "../user/user.component";
import { UserDetailComponent } from "../user/user-detail/user-detail.component";
import { TaskComponent } from "../task/task.component";
import { TaskDetailComponent } from "../task/task-detail/task-detail.component";
import { ManageComponent } from "../manage/manage.component";

const MANAGER_MAIN_ROUTES: Routes = [
  { path:'', component: ManagerMainComponent, children:[
    { path:'', component: TaskComponent},
    { path:'user', component: UserComponent},
    { path:'user/:id', component: UserDetailComponent},
    { path:'task', component: TaskComponent},
    { path:'task/:id', component: TaskDetailComponent},
    { path:'management', component: ManageComponent}
  ]}
];

export const managerRouting = RouterModule.forChild(MANAGER_MAIN_ROUTES);
