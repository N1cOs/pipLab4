import {AfterViewInit, Component, Input, OnInit, SimpleChange,} from '@angular/core';
import {CheckService} from "../../services/check.service";
import {Router} from "@angular/router";

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
  xErr: any;
  yErr: any;
  rErr: any;
  history = [];

  checkHistory() {
    this.checkService.checkHistory(localStorage.getItem('token'))
      .subscribe(
        (res) => {
          let amount = Object.keys(res).length;
          this.history = [];
          for (let i = 0; i < amount; i++) {
            res[i]['result'] = this.ifReaches(res[i]['result']);
            this.history.push( {
              x: res[i]['xValue'],
              y: res[i]['yValue'],
              r: res[i]['rValue'],
              result: res[i]['result'],
              date: res[i]['date']
            });

          }
          localStorage.setItem('history', JSON.stringify(this.history));
        }
      );
    return JSON.parse(localStorage.getItem('history'));

  }

  ifReaches(data) {
    if (data)
      return 'Попадание';
    else
      return 'Промах';
  }

  constructor(private checkService: CheckService, private route: Router) {
  }

  ngAfterViewInit() {
    buildCanvas();
    let target = document.querySelector('tbody');
    const mutationObserver = new MutationObserver(function (mutations) {
      let length = target.rows.length;
      mutations.forEach((mutation) => {
        if (mutation.type == "childList"
          && (mutation.addedNodes != NodeList[0])
          && mutation.addedNodes.length != 0
          && (<any> mutation.addedNodes.item(0)).rowIndex == 0) {
          historyDots();
        }
      })
    });
    historyDots();
    mutationObserver.observe(target, {
      childList: true
    });
    this.xErr = document.getElementById('x-err');
    this.yErr = document.getElementById('y-err');
    this.rErr = document.getElementById('r-err');
  }

  checkValues() {
    let correct = true;
    let valueY = parseFloat((<HTMLInputElement>document.getElementsByName('valueOfY')[0]).value);
    if (
      (this.valueOfX > 5) || (this.valueOfX < -3) || (typeof this.valueOfX === 'undefined')
    ) {
      this.xErr.style.display = 'inline-block';
      correct = false;
    } else {
      this.xErr.style.display = 'none';
    }
    if (
      (valueY > 3) || (valueY < -3) || (typeof valueY === 'undefined') || (!valueY)
    ) {
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

  checkCanvasValues(x, y) {
    let correct = true;
    let valueY = y;
    if (
      (x > 5) || (x < -3) || (typeof x === 'undefined')
    ) {
      this.xErr.style.display = 'inline-block';
      correct = false;
    } else {
      this.xErr.style.display = 'none';
    }
    if (
      (valueY > 3) || (valueY < -3) || (typeof valueY === 'undefined') || (!valueY)
    ) {
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
      this.valueOfY = parseFloat(this.valueOfY.toString(10).replace(',', '.'));
      this.checkService.check(this.valueOfX, this.valueOfY, this.valueOfR, token)
        .subscribe((res: Response) => {
          res['result'] = this.ifReaches(res['result']);
          this.history.splice(0, 0, {
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

  ngOnInit() {
    this.history = this.checkHistory();
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
    let x = this.valueOfX;
    this.valueOfY = -1 * parseFloat(((MP.y - canvas.height / 2) / scale)
      .toFixed(3));
    let y = this.valueOfY;
    if (this.checkCanvasValues(x, y)) {
      let token = localStorage.getItem('token');
      this.checkService.check(x, y, this.valueOfR, token)
        .subscribe((res: Response) => {
          res['result'] = this.ifReaches(res['result']);
          this.history.splice(0, 0, {
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
