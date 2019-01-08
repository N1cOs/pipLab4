import {AfterViewInit, Component, Input, NgIterable, OnInit, ViewChild} from '@angular/core';
import {CheckService} from "../../services/check.service";
import {isEmbeddedView} from "@angular/core/src/view/util";
import {isEmpty} from "rxjs/operators";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  @Input() private history = [];

  constructor(private checkService: CheckService) {
  }
  ngOnInit() {
  }
  init(){
    console.log(localStorage.getItem('token'))
  }
  checkHistory(){
    this.history=this.checkService.checkHistory(localStorage.getItem('token'));
    console.log(this.isEmpty());
  }

  isEmpty(): number{
    return this.history.length;
  }
}
