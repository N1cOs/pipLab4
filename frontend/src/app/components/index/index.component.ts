import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {
  context: CanvasRenderingContext2D;
  // width: number;
  // height: number;
  // coordCenter: number;
  // scale: number;

  @ViewChild("myCanvas") myCanvas;
  private radius: number;
  private width: number;
  private height: number;
  private coordCenter: number;
  private scale: number;
  private valueOfX: number;
  private valueOfY: number;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var radius = 100;
    const canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');

    this.rock(canvas, this.context);
  }

  rock(canvas, context) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.coordCenter = this.width / 2;
    this.scale = 50;


  }

  getMP(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left - 5,
      y: event.clientY - rect.top - 5
    };
  }

  draw(ctx, coordCenter, width, height, radius) {
    ctx.beginPath();
    let startangel = 180 * Math.PI / 180;
    let endangel = 270 * Math.PI / 180;
    ctx.arc(coordCenter, coordCenter, radius / 2, startangel, endangel, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.moveTo(width / 2, height / 2 - radius / 2);
    ctx.lineTo(width / 2 - radius / 2, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.rect(width / 2, height / 2 - radius, radius, radius);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 + radius);
    ctx.lineTo(width / 2 + radius, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.fillStyle = '#ed1c24';
  }

  historyDots(ctx, scale, width, height, valueOfX, valueOfY) {
    const xCoordinates = document.querySelectorAll('td.x_coord');
    const yCoordinates = document.querySelectorAll('td.y_coord');
    for (let i = 0; i < xCoordinates.length; i++) {
      ctx.beginPath();
      // let valueOfX = parseFloat(xCoordinates[i].innerText);
      // let valueOfY = parseFloat(yCoordinates[i].innerText);
      ctx.arc(valueOfX * scale + width / 2, height / 2 - valueOfY * scale, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ed1c24';
      ctx.fill();
    }
  }
}