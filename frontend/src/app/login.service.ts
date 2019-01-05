import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Token} from "./token";
import {Observable} from "rxjs";
import {stringify} from "querystring";
import {map} from 'rxjs/operators';

const postOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  response: string;
  // url to api login
  private loginUrl = '/api/login';

  // test req body
  private body = '{"login":"dimon","password":"5678"}';

  login(): Observable<Token> {
    return this.http.post<Token>(this.loginUrl, this.body, postOptions);
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  constructor(private http: HttpClient) {
  }
}
