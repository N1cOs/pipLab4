import {Component, Input} from '@angular/core';

declare function historyDots();

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  @Input() history = [];

  constructor() {

  }

}
