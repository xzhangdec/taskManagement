import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private isActive: boolean = false;

  changeActive() {
    this.isActive != this.isActive;
  }

  constructor() { }

  ngOnInit() {
  }

}
