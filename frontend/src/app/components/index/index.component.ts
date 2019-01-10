import {Component,  OnInit} from '@angular/core';
import {CheckService} from "../../services/check.service";

declare function buildCanvas();

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  history = [];

  constructor(private checkService: CheckService) {

  }

  ngOnInit() {
    this.history = this.checkHistory();
  }

  ngAfterViewInit() {
    buildCanvas();

  }

  checkHistory() {
    this.checkService.checkHistory(localStorage.getItem('token'))
      .subscribe(
        (res) => {
          let amount = Object.keys(res).length;
          this.history = [];
          for (let i = 0; i < amount; i++) {
            res[i]['result'] = this.ifReaches(res[i]['result']);
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
        }
      );
    return JSON.parse(localStorage.getItem('history'));

  }

  ifReaches(data) {
    if (data)
      return 'попадание';
    else
      return 'промах!';
  }

}
