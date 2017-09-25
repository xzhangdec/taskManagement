import { Component, OnInit, Input } from '@angular/core';
import {Task} from "../../shared/task.model";
import { TaskService }   from '../../shared/task.service';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";

import {paramSharedService} from '../paramShared_service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css', './task.component.scss']
})
export class TaskComponent implements OnInit {
  private types: any = new Array();
  private subscribe: Subscription = new Subscription();
  private user_Task_Info;
  private tasks: Array<Task> = [];
  private filteredTasks: Task[] = [];
  private params: string;
  @Input() selectedUser;

  constructor(private taskService: TaskService, private paramService: paramSharedService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.types = [{id: 'Null', name: 'Sort By'},
      {id: 'newest', name: 'Newest'},
      {id: 'PtoN', name: 'Time:Past to Now'},
      {id: 'NtoP', name: 'Time:Now to Past'},
    ];
  }

  callType(value) {
    console.log(value);

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.paramService.upLoadParam(params['id']);
      console.log(params['id']);
      this.taskService.getUserTasks(params['id']).subscribe(info => {
        for (let item of info) {
          this.taskService.getTaskById(item).subscribe(task => {

            this.paramService.user_Task_list.push(task);
            this.paramService.getUserTasks();
            this.tasks.push(task);
            this.filteredTasks.push(task);
            console.log(this.tasks);
          });
        }
      });
    })
  }


  //filter function started

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTasks = this.listFilter ? this.performFilter(this.listFilter) : this.tasks;
  }


  performFilter(filterBy: string): Task[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tasks.filter((task: Task) =>
    task.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  //filter function ended


  navToTaskDetail(id) {
    console.log(id);
    this.router.navigate(['/user/task', id]);
  }



}



