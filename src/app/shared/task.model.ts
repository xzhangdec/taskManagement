import {User} from "./user.model"

export class Task {
  public userList:{[key:number]:User} = {};
  constructor(public title: string, public description: string, public startDate: string, public dueDate: string, public located?: number, public _id?: number)
  {}

  addNewUser(u:User){
    this.userList[u._id] = u;
  }
  deleteUser(u:User){
    delete this.userList[u._id];
  }

}
