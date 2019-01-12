import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import {CheckService} from '../../services/check.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Check} from '../../interfaces/check';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas')
  canvasRef:ElementRef;


  readonly xMin:number = -3;
  readonly xMax:number = 5;
  readonly yMin:number = -3;
  readonly yMax:number = 3;
  readonly rMin:number = 1;
  readonly rMax:number = 5;

  xValues:number[] = [];
  rValues:number[] = [];

  coordinatesForm:FormGroup;

  history:Check[] = [];


  constructor(private fb:FormBuilder, private checkService: CheckService) {
    this.coordinatesForm = fb.group({
      'valueOfX':[null, Validators.compose([
        Validators.required, Validators.min(this.xMin), Validators.max(this.xMax)
      ])],
      'valueOfY':[null, Validators.compose([
        Validators.required, Validators.pattern('^[+-]?([0-9]*[.,])?[0-9]*$'),
        Validators.min(this.yMin), Validators.max(this.yMax)
      ])],
      'valueOfR':[null, Validators.compose([
        Validators.required, Validators.min(this.rMin), Validators.max(this.rMax)
      ])]
    });
  }

  ngOnInit() {
    for (let i = this.xMin; i <= this.xMax; i++)
      this.xValues.push(i);

    for (let i = this.rMin; i <= this.rMax; i++)
      this.rValues.push(i);
  }

  ngAfterViewInit(): void {
    this.initHistory();
    this.drawCanvas();
  }

  onSubmit(check:any){
    const request = {
      x: check.valueOfX,
      y: check.valueOfY,
      r: check.valueOfR,
    };
    this.checkService.check(request, localStorage.getItem('token'))
      .subscribe((data:Check) => {
      this.history.splice(0, 0, data);
      this.historyDots();
    });
  }

  private initHistory(){
    this.checkService.checkHistory(localStorage.getItem('token'))
      .subscribe((results:Check[]) =>{
        this.history = results;
        this.historyDots();
      });
  }

  drawCanvas(){
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    const coordCenter = width / 2;
    const scale = 20;
    const radius = 100;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    let startangel = 90 * Math.PI / 180;
    let endangel = 180 * Math.PI / 180;
    ctx.arc(coordCenter, coordCenter, radius, startangel, endangel, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.moveTo(width / 2, height / 2 + radius);
    ctx.lineTo(width / 2 - radius, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.rect(width / 2, height / 2 - radius, radius / 2, radius);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 - radius / 2);
    ctx.lineTo(width / 2 - radius, height / 2);
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

  historyDots(){
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    const scale = 20;
    const ctx = canvas.getContext('2d');

    for(let check of this.history){
      ctx.beginPath();
      ctx.arc(check.xValue * scale + width / 2,
        height / 2 - check.yValue * scale,
        2,
        0,
        Math.PI * 2);
      if(check.result)
        ctx.fillStyle = '#1f4';
      else
        ctx.fillStyle = '#ed1c24';
      ctx.fill();
    }
  }
}
