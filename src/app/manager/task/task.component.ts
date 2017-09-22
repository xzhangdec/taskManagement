import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../../shared/task.service';
import { Task } from '../../shared/task.model';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css', './task.component.scss']
})
export class TaskComponent implements OnChanges, OnInit {

  private selectedTask: Task;
  private tasks: Array<Task>;
  private displayStatus: string = 'none';
  filteredTasks:Task[] = [];

  constructor(private taskService: TaskService, private router:Router) {
  }

  showDisplay() {
    this.displayStatus = 'block';
  }

  changeFormStatus(event) {
    this.displayStatus = event;
  }

  refreshPage(event) {
    console.log(event);
    if (event) {
      return this.taskService.getAllTasks().subscribe(tasks => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
      });
    }
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



  navToTaskDetail(id){
    console.log(id);
    this.router.navigate(['/manager/task', id]);
  }

  ngOnInit() {
    this.getTasks();
  }

  ngOnChanges() {
    this.getTasks();
  }

  //Delete Tasks
  delTask(id) {
    console.log('!!!!!!!!! !!!!!!!!del Task');
    this.taskService.delOneTask(id).subscribe(
      () => {
        this.getTasks();
      })

  }


  //Get all
  getTasks() {
    console.log('!!!!!!!!!!!!!!!!! !!!!!!!getAll');
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });

  }

}
