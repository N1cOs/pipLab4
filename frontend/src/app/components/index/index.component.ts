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

  private history = [];

  constructor(private checkService: CheckService) {

  }
  ngOnInit() {
    this.history = this.checkHistory();
  }

  @ViewChild('table') table: ElementRef;

  ngAfterViewInit(){

  }
  checkHistory(){
    this.checkService.checkHistory(localStorage.getItem('token'))
      .subscribe(
        (res) => {
          let amount = Object.keys(res).length;
          this.history = [];
          for (let i = 0; i < amount; i++) {
            this.history.push(
              {
                x: res[i]['xValue'],
                y: res[i]['yValue'],
                r: res[i]['rValue'],
                result: res[i]['result'],
                date: res[i]['date']
              }
            )
          }
          localStorage.setItem('history', JSON.stringify(this.history));
          // return res;
        }
      );
    return JSON.parse(localStorage.getItem('history'));

    // console.log(this.history)
   }


}
