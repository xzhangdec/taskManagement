import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Task} from "../../shared/task.model";
import { TaskService }   from '../../shared/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css', './task.component.scss']
})
export class TaskComponent implements OnInit {
  private types: any = new Array();
  private userInfo;
  @Input() selectedUser;

  constructor( private taskService:TaskService ) {
    this.types = [ {id:'Null', name:'Sort By'},
      {id:'newest',name:'Newest'},
      {id:'PtoN', name:'Time:Past to Now'},
      {id:'NtoP', name:'Time:Now to Past'},
    ];
  }

  callType(value){
    console.log(value);

  }

  ngOnInit() {
    this.taskService.getTaskByName(this.selectedUser).subscribe(info => {
      this.userInfo = info;
      console.log(info)

    });
  }

}
