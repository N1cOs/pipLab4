import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CheckService {

  private checkUrl = environment.apiUrl + '/check';
  private checkHistoryUrl = this.checkUrl + '/history';

  constructor(private http: HttpClient) {

  }

  check(check:any, token: string) {
    const postOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token})
    };

    return this.http.post(this.checkUrl, check, postOptions);
  }

  checkHistory(token: string) {
    const getOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(this.checkHistoryUrl, getOptions);


  }

}
