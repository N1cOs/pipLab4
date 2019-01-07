import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Token} from "../token";


@Injectable({
  providedIn: 'root'
})
export class CheckService {

  // url to api login
  private checkUrl = 'api/check';

  // private checkUrl = 'http://localhost:8080/lab4/api/check';

  constructor(private http: HttpClient, private token: Token) {
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


}
