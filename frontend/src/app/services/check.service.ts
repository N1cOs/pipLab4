import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const postOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  // url to api login
  private checkUrl = 'api/check';
  // private checkUrl = 'http://localhost:8080/lab4/api/check';

  constructor(private http: HttpClient) {
  }

  check(valueX: number, valueY: number, valueR: number) {
    var body = {
      "x": valueX,
      "y": valueY,
      "r": valueR
    };
    return this.http.post(this.checkUrl, body, postOptions);
  }

}
