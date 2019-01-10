import {Component,Input, OnInit, } from '@angular/core';
import {CheckService} from "../../services/check.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  @Input() valueOfX: number;
  @Input() valueOfY: number;
  @Input() valueOfR: number;
  answer: string;

  constructor(private checkService: CheckService, private route: Router) {
  }

  checkValues() {
    let correct = true;
    if (
      (this.valueOfX > 5) || (this.valueOfX < -3) || (typeof this.valueOfX === 'undefined')
    ) {
      alert('x is incorect');
      correct = false;
    }
    if (
      (this.valueOfY > 3) || (this.valueOfY < -3) || (typeof this.valueOfY === 'undefined') || (!this.valueOfY)
    ) {
      alert('y is incorrect');
      correct = false;
    }
    if (
      (this.valueOfR > 5) || (this.valueOfR < 1) || (typeof this.valueOfR === 'undefined')
    ) {
      alert('r is incorrect');
      correct = false;
    }

    return correct;
  }


  checkResults() {
    if (this.checkValues()) {
      let token = localStorage.getItem('token');
      this.checkService.check(this.valueOfX, this.valueOfY, this.valueOfR, token)
        .subscribe((res: Response) => this.answer = res['result']);
    }
  }

  ngOnInit() {

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
    let radius = this.valueOfR;
    this.valueOfX = parseFloat(((MP.x - canvas.width / 2) / scale)
      .toFixed(3));
    this.valueOfY = -1 * parseFloat(((MP.y - canvas.height / 2) / scale)
      .toFixed(3));
    if (radius && radius >= 1 && radius <= 5) {
      let token = localStorage.getItem('token');
      this.checkService.check(this.valueOfX, this.valueOfY, this.valueOfR, token)
        .subscribe((res: Response) => this.answer = res['result']);

    } else {
      alert('Выберите корректное значение радиуса r');
    }
  }

}
