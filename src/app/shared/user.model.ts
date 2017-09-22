import { Task } from "./task.model"

export class User{
  public taskList: {[key:number]:Task} = {};
  constructor(public age: number, public gender:string, public imgUrl:string, public name:string, public title: string, public address: string, public phone: number, public email: string, public _id?:string){};


  addNewTask(t:Task){
    this.taskList[t._id] = t;
  }
  deleteTask(t:Task){
    delete this.taskList[t._id];
  }

}

