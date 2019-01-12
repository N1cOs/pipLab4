import {Component, OnInit,} from '@angular/core';
import {CheckService} from '../../services/check.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Check} from '../../interfaces/check';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  readonly xMin:number = -3;
  readonly xMax:number = 5;
  readonly yMin:number = -3;
  readonly yMax:number = 3;
  readonly rMin:number = 1;
  readonly rMax:number = 5;

  xValues:number[] = [];
  rValues:number[] = [];

  coordinatesForm:FormGroup;

  history:Check[];


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
    for(let i = this.xMin; i <= this.xMax; i++)
      this.xValues.push(i);

    for(let i = this.rMin; i <= this.rMax; i++)
      this.rValues.push(i);

    this.initHistory();
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
    });
  }

  private initHistory(){
    this.checkService.checkHistory(localStorage.getItem('token'))
      .subscribe((results:Check[]) =>{
        this.history = results;
      });
  }

}
