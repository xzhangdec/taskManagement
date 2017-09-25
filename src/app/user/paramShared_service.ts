import {Injectable} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class paramSharedService {
  private param: string;
  private subscription:Subscription = new Subscription();
  user_Task_list= [];


  constructor() {
    this.getUserTasks();
  }


  upLoadParam(name) {
    this.param = name;

    console.log(this.param);
  }

  getParam() {
    console.log(this.param);
    return this.param;
  }

  getUserTasks() {
    console.log(this.user_Task_list);
    return this.user_Task_list;
  }

}
