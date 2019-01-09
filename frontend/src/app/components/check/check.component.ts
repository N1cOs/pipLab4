import {Component, HostListener, Input, OnInit, ViewChild, ɵangular_packages_core_core_r} from '@angular/core';
import {CheckService} from "../../services/check.service";
import {Router} from "@angular/router";


declare function buildCanvas();

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {


  context: CanvasRenderingContext2D;
  @Input() valueOfX: number;
  @Input() valueOfY: number;
  @Input() valueOfR: number;
  answer: string;
  scale: number;
  canvas: HTMLCanvasElement;

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
    // let validationScript = document.createElement('script');
    // validationScript.type = 'text/javascript';
    // validationScript.src = '../../../assets/validation.js';
    buildCanvas();
  }


  getMP(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left - 5,
      y: event.clientY - rect.top - 5
    };
  }

  canvasListener(e) {

    this.scale = this.canvas.width/10;

    this.canvas = document.querySelector('canvas');
    console.log(this.canvas.height);
    let MP = this.getMP(this.canvas, e);
    let radius = this.valueOfR;
    this.valueOfX = parseFloat(((MP.x - this.canvas.width / 2) / this.scale)
      .toFixed(3));
    this.valueOfY = parseFloat(((MP.y - this.canvas.height / 2) / this.scale)
      .toFixed(3));
    if (radius && radius >= 1 && radius <= 5) {
      let token = localStorage.getItem('token');
      this.checkService.check(this.valueOfX, this.valueOfY, this.valueOfR, token)
        .subscribe((res: Response) => this.answer = res['result']);
    } else {
      alert('Выберите корректное значение радиуса r');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 722) {
      this.scale = 20;
      this.canvas = document.querySelector('canvas');
    } else {
      this.scale = 30;
      this.canvas = document.querySelector('canvas');
    }
    console.log(this.canvas.height)

  }


}
