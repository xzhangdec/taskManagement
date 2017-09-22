import { NgModule }      from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

@NgModule({
  imports:   [ CommonModule, FormsModule ,ReactiveFormsModule, HttpModule],
  exports:   [ CommonModule, FormsModule ,ReactiveFormsModule, HttpModule]
})
export class SharedModule { }
