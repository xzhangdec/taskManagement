import { Component,OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../../shared/task.model";
import { TaskService }   from '../../../shared/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit{
  private selectedTask:Task;
  private subscribe:Subscription = new Subscription();
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private taskService:TaskService){}


  onClick(){
    this.router.navigate(['/manager/task']);
  }

  values(obj) : Array<string> {
    return Object.keys(obj).map(e => obj[e]);
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params)=> {
      this.taskService.getTaskById(params['id']).subscribe(task => {
        this.selectedTask = task;
      });
    })

  }


}
