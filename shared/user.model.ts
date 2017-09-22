import { Task } from "./task.model"

export class User{
  public taskList: {[key:number]:Task} = {};
  constructor(public name:string, public age:number, public gender:string, public imgUrl:string, public address: string, public city: string, public id?:string){};

  addNewTask(t:Task){
    this.taskList[t.id] = t;
  }
  deleteTask(t:Task){
    delete this.taskList[t.id];
  }
}

