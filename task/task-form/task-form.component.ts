import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl, AbstractControl} from '@angular/forms';

import { Task } from '../../shared/task.model';
import { TaskService } from '../../shared/task.service';
import "rxjs/Rx";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css', 'task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  private myForm:FormGroup;
  private errors:{[key:string]:Array<any>} = {};
  private errorMsgs:{[key:string]:string} = {};
  private subscription:Subscription = new Subscription();
  @Output() formStatus = new EventEmitter();

  stopForm() {
    this.formStatus.emit('none');
    console.log(111);
  }


  constructor(private formBuilder:FormBuilder, private taskService:TaskService){}

  ngOnInit(){
    this.myForm = this.formBuilder.group({
      'title':['', [Validators.required, Validators.minLength(1), this.exampleValidator]],
      'description':['', [Validators.required, Validators.minLength(1)]],
      'startDate':['', [Validators.required]],
      'dueDate':['', [Validators.required]]
    })
    this.registerInputCheck();
  }

  onSave(ev){
    this.taskService.createTask(new Task(this.myForm.value.title,
      this.myForm.value.description,
      this.myForm.value.startDate,
      this.myForm.value.dueDate
    ));
  }

  registerInputCheck(){
    this.errors['title'] = [
      {key:'required', msg:'* name required!'},
      {key:'minlength', msg:'* name is too short!'},
      {key:'example', msg:'* name is example!'}
    ];
    this.errors['description'] = [
      {key:'required', msg:'* description required!'},
      {key:'minlength', msg:'* description is to short!'}
    ];
    this.errors['date'] = [
      {key:'required', msg:'* is required to set!'}
    ];
  }

  handleInputError(control:AbstractControl, outputElm){
    if(!control.valid && this.errors[outputElm]){
      for(let err of this.errors[outputElm]){
        if(control.hasError(err.key)){
          this.errorMsgs[outputElm] = err.msg;
        }
      }
    }
  }

  exampleValidator(control){
    if(control.value == 'example'){
      return {'example':true}
    }
    return null
  }

  asyncValidator(control){
    let that = this;
    const promise =  new Promise<any>((resolve, reject)=>{
      let v = control.value;
      setTimeout(()=>{
        if(v == 'example'){
          control.setErrors({'example':'example'});
          that.handleInputError(control,'country')
          resolve({'example':true})
        }else{
          resolve(null);
        }
      },1500)
    })
    return promise;
  }

}
