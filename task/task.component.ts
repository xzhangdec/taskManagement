import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task.model';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css', './task.component.scss']
})
export class TaskComponent implements OnInit {

  private selectedTask: Task;
  private tasks: Array<Task>;
  private displayStatus: string = 'none';
  filteredTasks:Task[] = [];

  showDisplay() {
    this.displayStatus = 'block';
  }

  changeFormStatus(event) {
    this.displayStatus = event;
  }


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

  constructor(private taskService: TaskService, private router:Router) {
  }

  delTask(id) {
    return this.taskService.delTaskById(id);
  }


  navToTaskDetail(id){
    console.log(id);
    this.router.navigate(['/main/task', id]);
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
  }

}
