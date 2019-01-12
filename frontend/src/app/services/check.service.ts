import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Check} from '../interfaces/check';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CheckService {


  // url to api login
  private checkUrl = environment.apiUrl + '/check';
  private checkHistoryUrl = this.checkUrl + '/history';

  constructor(private http: HttpClient) {

  }

  check(check:Check, token: string) {
    const request = {
      x: check.valueOfX,
      y: check.valueOfY.toString(10).replace(',', '.'),
      r: check.valueOfR
    };

    const postOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
    };

    return this.http.post(this.checkUrl, request, postOptions);
  }

  checkHistory(token: string) {
    var bit = {x: null, y: null, r: null, result: null, date: null};

    var getOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(this.checkHistoryUrl, getOptions);


  }


}
