import { Task } from './task.model';
import {Injectable} from "@angular/core";
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs";

@Injectable()
export class TaskService {
  taskList:Array<Task> = new Array();
  private taskId = 0;
  private subscription:Subscription = new Subscription();
  private filterList: any =  [];

  API = 'http://localhost:3000';

  constructor(private http: Http) {
    console.log("User service start");
    this.subscription = this.getAllTasks().subscribe((data)=>{
      for(var i in data){
        this.taskList.push(new Task(data[i].title, data[i].description, data[i].startDate, data[i].dueDate, data[i].located, data[i]._id));
        console.log(22222);
        console.log(this.taskList);
      }
    },(err)=>{
      console.error("Get Users Err: " + err);
    });
  }


  //Add one task to the API
  addTask(newTask: Task): Observable<any> {
    console.log('add started');
    newTask.located = this.taskId;
    this.taskId = this.taskId + 1;
    console.log(newTask);
    return this.http.post(`${this.API}/tasks`, newTask);
  }


  tasksGet():Array<Task> {
    console.log("tasksGet");
    console.log(this.taskList);
    return this.taskList;
  }


  //Delete one task to the API
  delOneTask(id) {
    return this.http.delete(`${this.API}/tasks/`+id).map(res => res.json());
  }

  //Get task by ID
  getTaskById(id) {
    return this.http.get(`${this.API}/tasks/`+id).map(res => res.json());
  }

  //Get task by Name
  getTaskByName(name) {
    return this.http.get(`${this.API}/get_task_by_name/`+ name).map(res => res.json());
  }
/*
  //Update one person to the API
  savePerson(firstname, lastname, phone, calls, batch, id) {
    console.log('Api called successfully!!! !!!');

    return this.http.put(`${this.API}/tasks/`+id, {firstname, lastname, phone, calls, batch})
      .map(res=>res.json());
  }
*/

  //Get all posts from the API
  getAllTasks() {
    return this.http.get(`${this.API}/tasks`).map(res => res.json());
  }


}
