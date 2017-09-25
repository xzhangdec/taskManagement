import {Component, OnInit,OnDestroy, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {manager_AuthService, user_AuthService} from "../shared/auth.service";
import { UserService } from '../shared/user.service';
import { User } from "../shared/user.model";


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
  private Users: User[] = [];
  private userName = [];

  constructor(private formBuilder:FormBuilder, private userService: UserService, private mAService:manager_AuthService, private uAService:user_AuthService, private router:Router){}

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
    this.router.navigate(['/user',id.value]);
  }

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      'username':['',[Validators.required, Validators.minLength(4)]],
      'passwordU':['',[Validators.required, Validators.maxLength(10)]],
    });
    this.managerForm = this.formBuilder.group({
      'managername':['',[Validators.required, Validators.minLength(4)]],
      'passwordM':['',[Validators.required, Validators.maxLength(10)]],
    });
    this.registerInputCheck();
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(users => {
      console.log(users);
      this.Users = users;
      for (let item of this.Users) {
        this.userName.push(item["name"]);
      }
      console.log(this.userName);
      return this.userName;
    });
  }


  onSaveUser(ev, id){
    if(this.userName.indexOf(this.userForm.value['username']) > -1){
      this.uAService.loginUser = {username: this.userForm.value['username'], password:this.userForm.value['passwordU']};
      this.router.navigate(['/user',id]);
    }
  }

  onSaveManager(ev){
    if(this.managerForm.value['managername']=='root'){
      this.mAService.loginManager = {managername:this.managerForm.value['managername'], password:this.managerForm.value['passwordM']};
      this.router.navigate(['/manager']);
    }
  }

  registerInputCheck(){
    this.errors['managername'] = [
      {key:'required', msg:'* account required!'},
      {key:'minlength', msg:'* account is too short!'},
    ];
    this.errors['passwordM'] = [
      {key:'required', msg:'* password required!'},
      {key:'maxlength', msg:'* password is to long!'}
    ];
    this.errors['username'] = [
      {key:'required', msg:'* account required!'},
      {key:'minlength', msg:'* account is too short!'},
    ];
    this.errors['passwordU'] = [
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
