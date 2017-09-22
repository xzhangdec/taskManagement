import { Task } from './task.model';
import {Injectable} from "@angular/core"

@Injectable()
export class TaskService {
  taskList:Array<Task> = new Array();
  private taskId = 0;
  private filterList: any =  [];

  getTasks():Array<Task> {
    console.log(this.taskList);
    return this.taskList;
  }

  getTaskById(id:number){
    for(let t of this.taskList){
      if(t.id == id){
        return t;
      }
    }
    return null;
  }

  delTaskById(title:string) {
    for (let i in this.taskList) {
      if(this.taskList[i].title == title) {
        this.taskList.splice(parseInt(i), 1);
      }
    }
    this.taskList = this.taskList;
    return this.taskList;

  }

  createTask(newTask:Task){
    newTask.id = this.taskId;
    this.taskId = this.taskId + 1;
    console.log(newTask);
    this.taskList.push(newTask);
  }
}
