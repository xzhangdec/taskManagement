import {Component, OnInit,OnDestroy, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import { User } from "../../../shared/user.model";
import { UserService }  from '../../../shared/user.service';
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css', './user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public myForm:FormGroup;
  private errors:{[key:string]:Array<any>} = {};
  private errorMsgs:{[key:string]:string} = {};
  private subscription:Subscription = new Subscription();

  @Output() formStatus = new EventEmitter();
  @Output() refreshData = new EventEmitter();

  API = 'http://localhost:3000';


  stopForm() {
    this.formStatus.emit('none');
    this.refreshData.emit(true);
  }


  constructor(private formBuilder:FormBuilder, private userService:UserService, private http: Http) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      'name':['',[Validators.required, Validators.minLength(4), this.exampleValidator]],
      'gender':['',[Validators.required]],
      'imgUrl':['', [Validators.required]],
      'age':['',[Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
      'address':['', [Validators.required]],
      'phone':['',[Validators.required,Validators.pattern('^[0-9]{1,10}$')]],
      'email': ['', [Validators.required]],
      'title': ['', [Validators.required]]
    });
    this.registerInputCheck();
  }

  onSave(){
    this.subscription = this.userService.addUser(new User(
      this.myForm.value.age,
      this.myForm.value.gender,
      this.myForm.value.imgUrl,
      this.myForm.value.name,
      this.myForm.value.title,
      this.myForm.value.address,
      this.myForm.value.phone,
      this.myForm.value.email
    )).subscribe((data)=>{
      this.userService.userList.push(new User(this.myForm.value.age,
        this.myForm.value.gender,
        this.myForm.value.imgUrl,
        this.myForm.value.name,
        this.myForm.value.title,
        this.myForm.value.address,
        this.myForm.value.phone,
        this.myForm.value.email));
    });

  }



  registerInputCheck(){
    this.errors['age'] = [
      {key:'required', msg:'* age required!'},
      {key:'pattern', msg:'* age format is invalid!'}
    ];
    this.errors['name'] = [
      {key:'required', msg:'* name required!'},
      {key:'minlength', msg:'* name is too short!'},
      {key:'example', msg:'* name is example!'}
    ];

    this.errors['gender'] = [
      {key:'required', msg:'* gender required!'}
    ];
    this.errors['imgUrl'] = [
      {key:'required', msg:'* imgUrl required!'}
    ];
    this.errors['address'] = [
      {key:'required', msg:'* address required!'},
    ];
    this.errors['phone'] = [
      {key:'required', msg:'* phone required!'},
      {key:'pattern', msg:'* phone format is invalid!'}
    ];
    this.errors['email'] = [
      {key:'required', msg:'* email required!'}
    ];
    this.errors['title'] = [
      {key:'required', msg:'* title required!'}
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


