import {AfterViewInit, Component, Input, OnInit,} from '@angular/core';
import {CheckService} from '../../services/check.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

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
    for(let i = this.xMin; i <= this.xMax; i++)
      this.xValues.push(i);

    for(let i = this.rMin; i <= this.rMax; i++)
      this.rValues.push(i);
  }

}
