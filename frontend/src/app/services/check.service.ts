import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CheckService {


  private history = [];

  // url to api login
  private checkUrl = 'api/check';
  // private checkUrl = 'http://localhost:8080/lab4/api/check';
  private checkHistoryUrl = 'api/check/history';

  constructor(private http: HttpClient) {

  }

  check(valueX: number, valueY: number, valueR: number, token: string) {
    var body = {
      "x": valueX,
      "y": valueY,
      "r": valueR
    };

    var postOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
    };
    return this.http.post(this.checkUrl, body, postOptions);
  }

  checkHistory(token: string) {
    var bit = {x: null, y: null, r: null, result: null, date: null};

    var getOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    this.http.get(this.checkHistoryUrl, getOptions)
      .subscribe(
        (res) => {
          let amount = Object.keys(res).length;
          this.history = [];
          for (let i = 0; i < amount; i++) {
            this.history.push(
              {
                x: res[i]['xValue'],
                y: res[i]['yValue'],
                r: res[i]['rValue'],
                result: res[i]['result'],
                date: res[i]['date']
              }
            )
          }
          console.log(this.history);
          // return res;
        }
      );
    return this.history;

  }


}
