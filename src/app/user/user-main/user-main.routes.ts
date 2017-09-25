import { Routes, RouterModule } from '@angular/router';

import { UserMainComponent } from './user-main.component';
import { TaskComponent } from '../task/task.component';
import { TaskDetailComponent } from '../task/task-detail/task-detail.component';
import { AccountComponent } from '../account/account.component';


const USER_MAIN_ROUTERS: Routes = [
  { path: '', component: UserMainComponent, children: [
    { path: '', component: TaskComponent },
    { path: '/user/account', component: AccountComponent},
    { path: '/user/task', component: TaskComponent},
    { path: '/task/:id', component: TaskDetailComponent }
  ]}
];

export const userRouting = RouterModule.forChild(USER_MAIN_ROUTERS);
