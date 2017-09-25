import { Component, OnInit } from '@angular/core';
import { paramSharedService } from '../paramShared_service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private param: string;

  constructor(private paramService: paramSharedService) {
    this.param = this.paramService.getParam();
  }

  ngOnInit() {
    this.param = this.paramService.getParam();
    console.log(this.param + 'nav');
  }

}
