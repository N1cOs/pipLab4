import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import {CheckService} from '../../services/check.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Check} from '../../interfaces/check';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas')
  canvasRef: ElementRef;


  readonly xMin: number = -3;
  readonly xMax: number = 5;
  readonly yMin: number = -3;
  readonly yMax: number = 3;
  readonly rMin: number = 1;
  readonly rMax: number = 5;

  xValues: number[] = [];
  rValues: number[] = [];

  coordinatesForm: FormGroup;
  readonly xFormName: string = 'valueOfX';
  readonly yFormName: string = 'valueOfY';
  readonly rFormName: string = 'valueOfR';

  history: Check[] = [];


  constructor(private fb: FormBuilder, private checkService: CheckService, private titleService:Title) {
    titleService.setTitle("Проверка");

    this.coordinatesForm = fb.group({
      [this.xFormName]: [null, Validators.compose([
        Validators.required, Validators.min(this.xMin), Validators.max(this.xMax)
      ])],
      [this.yFormName]: [null, Validators.compose([
        Validators.required, Validators.pattern('^[+-]?([0-9]*[.,])?[0-9]*$'),
        Validators.min(this.yMin), Validators.max(this.yMax)
      ])],
      [this.rFormName]: [null, Validators.compose([
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
    this.addRadioListeners(this);
    this.initHistory();
    this.drawCanvas(5);

  }

  addRadioListeners(component: CheckComponent) {
    let rRadios = document.getElementsByName('valueOfR');
    for (let i = 0; i < rRadios.length; i++) {
      rRadios[i].addEventListener('change', function () {
        let radius = parseFloat(this.id.substr(1));
        component.drawCanvas(radius);
        component.historyDots();

      });
    }
  }

  onSubmit(check: any) {
    const request = {
      x: check.valueOfX,
      y: check.valueOfY,
      r: check.valueOfR,
    };
    this.checkService.check(request, localStorage.getItem('token'))
      .subscribe((data: Check) => {
        this.history.splice(0, 0, data);
        this.historyDots();
      });
  }

  private initHistory() {
    this.checkService.checkHistory(localStorage.getItem('token'))
      .subscribe((results: Check[]) => {
        this.history = results;
        this.historyDots();
      });
  }

  submitCanvas(event) {
    let scale = 50;
    let canvas = this.canvasRef.nativeElement;
    let MP = this.getWithOffset(canvas, event);
    this.coordinatesForm.patchValue({
      [this.xFormName]: parseFloat(((MP.x - canvas.width / 2) / scale).toFixed(3)),
      [this.yFormName]: -1 * parseFloat(((MP.y - canvas.height / 2) / scale).toFixed(3))
    });

    for (let i in this.coordinatesForm.controls)
      this.coordinatesForm.controls[i].markAsTouched();

    if (this.coordinatesForm.valid)
      this.onSubmit(this.coordinatesForm.value);
  }

  getWithOffset(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left - 2,
      y: event.clientY - rect.top - 2
    };
  }

  drawCanvas(rad) {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    const coordCenter = width / 2;
    const scale = 50;
    const radius = rad * scale;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
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

  historyDots() {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    const scale = 50;
    const ctx = canvas.getContext('2d');

    for (let check of this.history) {
      ctx.beginPath();
      ctx.arc(check.xValue * scale + width / 2,
        height / 2 - check.yValue * scale,
        2,
        0,
        Math.PI * 2);
      if (check.result)
        ctx.fillStyle = '#1f4';
      else
        ctx.fillStyle = '#ed1c24';
      ctx.fill();
    }
  }
}
