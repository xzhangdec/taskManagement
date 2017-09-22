import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from './app.component';
import { CoreModule } from './core.module';
import { routes } from './app.routes';


@NgModule({
  imports:      [ BrowserModule, CoreModule,routes],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
