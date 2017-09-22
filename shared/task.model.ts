import {User} from "./user.model"

export class Task {
  public userList:{[key:number]:User} = {};
  constructor(public title: string, public description: string, public startDate: string, public dueDate: string, public id?: number)
  {}
  addNewUser(u:User){
    this.userList[u.id] = u;
  }
  deleteUser(u:User){
    delete this.userList[u.id];
  }
}
