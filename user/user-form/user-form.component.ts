import {Component, OnInit,OnDestroy, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import { User } from "../../shared/user.model";
import { UserService }  from '../../shared/user.service';
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

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

  stopForm() {
    this.formStatus.emit('none');
    console.log(111);
  }


  constructor(private formBuilder:FormBuilder, private userService:UserService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      'name':['',[Validators.required, Validators.minLength(4), this.exampleValidator]],
      'age':['',[Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      'gender':['',[Validators.required]],
      'imgUrl':['', [Validators.required]],
      'address':['', [Validators.required]],
      'city':['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]]
      });
    this.registerInputCheck();
  }

  onSave(ev){
    console.log('start');
    this.subscription = this.userService.createUser(new User(this.myForm.value.name,
      this.myForm.value.age,
      this.myForm.value.gender,
      this.myForm.value.imgUrl,
      this.myForm.value.address,
      this.myForm.value.city
    )).subscribe((data)=>{
      this.userService.userList.push(new User(this.myForm.value.name, this.myForm.value.age, this.myForm.value.gender, this.myForm.value.imgUrl, this.myForm.value.address, this.myForm.value.city, data.name));
      console.log(this.userService.userList);
    });
    console.log(this.userService.userList);
    console.log('end')
  }



  registerInputCheck(){
    this.errors['name'] = [
      {key:'required', msg:'* name required!'},
      {key:'minlength', msg:'* name is too short!'},
      {key:'example', msg:'* name is example!'}
    ];
    this.errors['age'] = [
      {key:'required', msg:'* age required!'},
      {key:'pattern', msg:'* age format is invalid!'}
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
    this.errors['city'] = [
      {key:'required', msg:'* city required!'},
      {key:'pattern', msg:'* city format is invalid!'}
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


