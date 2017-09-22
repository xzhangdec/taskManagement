import { Component } from '@angular/core';
import {Task} from "../shared/task.model";
import {User} from "../shared/user.model";
import { UserService }  from '../shared/user.service';
import { TaskService }  from '../shared/task.service';


@Component({
  selector:'app-manage',
  templateUrl:'./manage.component.html',
  styleUrls:['./manage.component.css']
})
export class ManageComponent{
  private userList:Array<User>;
  private taskList:Array<Task>;
  constructor(private userService:UserService, private taskService:TaskService){
    this.userList = this.userService.getUsers();
    this.taskList = this.taskService.getTasks();
    console.log(this.taskList);
  }

  values(obj) : Array<string> {
    return Object.keys(obj).map(e => obj[e]);
  }


  dragOverHandler(ev){
    ev.preventDefault();
  }
  dropHandler(ev,id){
    ev.preventDefault();
    let u = JSON.parse(ev.dataTransfer.getData('text/plain'));
    console.log(u);
    console.log(this.taskList);
    console.log(this.taskList[id]);
    this.taskList[id].addNewUser(u);
    this.userService.getUserById(u.id).addNewTask(this.taskList[id]);
    console.log(this.taskList[id].userList[id]);
  }
  dragStartHandler(ev, u){
    ev.dataTransfer.dropEffect = 'copy';
    ev.dataTransfer.effectAllowe = 'copy';
    ev.dataTransfer.setData('text/plain',  JSON.stringify(u));
  }

  deleteHero(tId, uId){
    delete this.taskList[tId].userList[uId];
    delete this.userList[uId].taskList[tId];
  }
}
