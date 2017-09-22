import { Component, ChangeDetectorRef } from '@angular/core';
import {Task} from "../../shared/task.model";
import {User} from "../../shared/user.model";
import { UserService }  from '../../shared/user.service';
import { TaskService }  from '../../shared/task.service';
import { Http } from '@angular/http';


export interface IHash {
  [id: string] : string;
}

@Component({
  selector:'app-manage',
  templateUrl:'./manage.component.html',
  styleUrls:['./manage.component.css']
})
export class ManageComponent{
  private userList:Array<User>;
  private taskList:Array<Task>;
  private nameIdMap: IHash = {};

  API = 'http://localhost:3000';

  constructor(private userService:UserService, private taskService:TaskService, private http: Http, private cd: ChangeDetectorRef){

    this.userList = this.userService.usersGet();
    this.taskList = this.taskService.tasksGet();
  }
//Constructor end


  values(obj) : Array<string> {
    return Object.keys(obj).map(e => obj[e]);
  }


  dragOverHandler(ev){
    ev.preventDefault();
  }
  dropHandler(ev,id, task_oid) {
    ev.preventDefault();
    let u = JSON.parse(ev.dataTransfer.getData('text/plain'));
    this.taskList[id].addNewUser(u);
    this.userService.get_User_Id(u._id).addNewTask(this.taskList[id]);
    this.http.put(`${this.API}/assign_task/` + task_oid, u).map(res => res.json()).subscribe();
  }
    dragStartHandler(ev, u) {
      ev.dataTransfer.dropEffect = 'copy';
      ev.dataTransfer.effectAllowe = 'copy';
      ev.dataTransfer.setData('text/plain',  JSON.stringify(u));
    }

    deleteHero(tId, uId){
      delete this.taskList[tId].userList[uId];
      delete this.userList[uId].taskList[tId];
    }

}
