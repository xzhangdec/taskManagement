import {User} from "./user.model"

export class Task {
  public userList:{[key:number]:User} = {};
  constructor(public title: string, public description: string, public startDate: string, public dueDate: string, public located?: string, public _id?: number)
  {}

  addNewUser(u:User){
    this.userList[(u.name+u.phone)] = u;
  }
  deleteUser(u:User){
    delete this.userList[u._id];
  }

}
