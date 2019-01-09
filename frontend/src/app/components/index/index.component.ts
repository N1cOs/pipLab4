import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CheckService} from "../../services/check.service";
import {AppPage} from "../../../../e2e/src/app.po";
import {Observable} from "rxjs";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  private history: Observable<JSON>;

  constructor(private checkService: CheckService) {

  }
  ngOnInit() {
    this.history = this.checkHistory();
  }

  @ViewChild('table') table: ElementRef;

  ngAfterViewInit(){

  }
  checkHistory(){
    this.checkService.checkHistory(localStorage.getItem('token'));
    return JSON.parse(localStorage.getItem('history'));

    // console.log(this.history)
   }


}
