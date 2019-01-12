import {AfterViewInit, Component, Input, OnInit,} from '@angular/core';
import {CheckService} from '../../services/check.service';
import {Router} from '@angular/router';

declare function buildCanvas();

declare function historyDots();

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit, AfterViewInit {

  @Input() valueOfX: number;
  @Input() valueOfY: number;
  @Input() valueOfR: number;

  xValues:number[] = [];
  rValues:number[] = [];
  readonly xMin:number = -3;
  readonly xMax:number = 5;
  readonly rMin:number = -3;
  readonly rMax:number = 5;

  xErr: any;
  yErr: any;
  rErr: any;
  history = [];

  constructor(private checkService: CheckService) {

  }

  ngOnInit() {
    this.history = this.checkHistory();

    for(let i = this.xMin; i <= this.xMax; i++)
      this.xValues.push(i);

    for(let i = this.rMin; i <= this.rMax; i++)
      this.rValues.push(i);
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
            );

          }
          localStorage.setItem('history', JSON.stringify(this.history));
        }
      );
    return JSON.parse(localStorage.getItem('history'));

  }

  ifReaches(data) {
    return data ? 'Попадание' : 'Промах';
  }

  ngAfterViewInit() {
    buildCanvas();
    const target = document.querySelector('tbody');

    this.xErr = document.getElementById('x-err');
    this.yErr = document.getElementById('y-err');
    this.rErr = document.getElementById('r-err');
  }

  checkValues() {
    let correct = true;

    if (
      (this.valueOfX > 5) || (this.valueOfX < -3) || (typeof this.valueOfX === 'undefined')
    ) {
      this.xErr.style.display = 'inline-block';
      correct = false;
    } else {
      this.xErr.style.display = 'none';
    }
    if (
      (this.valueOfY > 3) || (this.valueOfY < -3) || (typeof this.valueOfY === 'undefined') || (!this.valueOfY)
    ) {
      //todo fix validation of y (when we are typing unmatchble with our regex, one character stores in y. no matter
      // where it is - in the end of expression or in the beginning. idea - validate as taking value of y, not this.y)
      //todo let user type in negative numbers
      this.yErr.style.display = 'inline-block';
      correct = false;
    } else {
      this.yErr.style.display = 'none';
    }
    if (
      (this.valueOfR > 5) || (this.valueOfR < 1) || (typeof this.valueOfR === 'undefined')
    ) {
      this.rErr.style.display = 'inline-block';
      correct = false;
    } else {
      this.rErr.style.display = 'none';
    }

    return correct;
  }


  checkResults() {
    if (this.checkValues()) {
      let token = localStorage.getItem('token');
      this.checkService.check(this.valueOfX, this.valueOfY, this.valueOfR, token)
        .subscribe((res: Response) => {
          res['result'] = this.ifReaches(res['result']);
          this.history.push({
            x: res['xValue'],
            y: res['yValue'],
            r: res['rValue'],
            result: res['result'],
            date: res['date']
          });
          historyDots();
        });
    }
  }



  getMP(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left - 5,
      y: event.clientY - rect.top - 5
    };
  }

  canvasListener(e) {
    let scale = 20;
    let canvas = document.querySelector('canvas');
    let MP = this.getMP(canvas, e);
    this.valueOfX = parseFloat(((MP.x - canvas.width / 2) / scale)
      .toFixed(3));
    this.valueOfY = -1 * parseFloat(((MP.y - canvas.height / 2) / scale)
      .toFixed(3));
    if (this.checkValues()) {
      let token = localStorage.getItem('token');
      this.checkService.check(this.valueOfX, this.valueOfY, this.valueOfR, token)
        .subscribe((res: Response) => {
          res['result'] = this.ifReaches(res['result']);
          this.history.push({
            x: res['xValue'],
            y: res['yValue'],
            r: res['rValue'],
            result: res['result'],
            date: res['date']
          });
        });
    }

  }


}
