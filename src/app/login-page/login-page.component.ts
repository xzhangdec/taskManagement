import {Component, OnInit,OnDestroy, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {CanService} from "../shared/can.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  private userForm:FormGroup;
  private managerForm:FormGroup;
  private errors:{[key:string]:Array<any>} = {};
  private errorMsgs:{[key:string]:string} = {};

  constructor(private formBuilder:FormBuilder, private canService:CanService, private router:Router){}

  isLoginVis: boolean = false;
  isFrontMove: boolean = false;
  isSignupVis: boolean = true;
  isSignupHide: boolean = true;
  isLoginHide: boolean = false;


  toggleClass() {
    this.isLoginVis = !this.isLoginVis;
    this.isFrontMove = !this.isFrontMove;
    this.isSignupVis = !this.isSignupVis;
    this.isSignupHide = !this.isSignupHide;
    this.isLoginHide = !this.isLoginHide;
  }

  navToSpecificUser(id) {
    this.router.navigate(['/user', id.value]);
  }

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      'account':['',[Validators.required, Validators.minLength(4)]],
      'password':['',[Validators.required, Validators.maxLength(10)]],
    });
    this.managerForm = this.formBuilder.group({
      'account':['',[Validators.required, Validators.minLength(4)]],
      'password':['',[Validators.required, Validators.maxLength(10)]],
    });
    this.registerInputCheck();
  }

  onSaveUser(ev){
    if(this.userForm.value['accountUser']=='root'){
      this.canService.loginUser = {account:this.userForm.value['accountUser'], password:this.userForm.value['passwordUser']};
      this.router.navigate(['/user']);
    }
  }

  onSaveManager(ev){
    if(this.managerForm.value['accountM']=='root'){
      this.canService.loginUser = {account:this.managerForm.value['accountM'], password:this.managerForm.value['passwordM']};
      this.router.navigate(['/manager']);
    }
  }

  registerInputCheck(){
    this.errors['accountM'] = [
      {key:'required', msg:'* account required!'},
      {key:'minlength', msg:'* account is too short!'},
    ];
    this.errors['passwordM'] = [
      {key:'required', msg:'* password required!'},
      {key:'maxlength', msg:'* password is to long!'}
    ];
    this.errors['accountUser'] = [
      {key:'required', msg:'* account required!'},
      {key:'minlength', msg:'* account is too short!'},
    ];
    this.errors['passwordUser'] = [
      {key:'required', msg:'* password required!'},
      {key:'maxlength', msg:'* password is to long!'}
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


}
