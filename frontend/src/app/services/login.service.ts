import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from "../token";



const postOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private token: Token) {

  }

  // url to api login
  private loginUrl = 'api/login';
  // private loginUrl = 'http://localhost:8080/lab4/api/login';

  // test req body
  // private body = '{"login":"dimon","password":"5678"}';

  login(login: string, password: string) {
    var body = {
      "login": login,
      "password": password
    };
    return this.http.post(this.loginUrl, body, postOptions)
      .subscribe(
        data => this.saveToken(data['token']),
        err => console.log(err)
      );
  }

  saveToken(jwt: string){
    if (jwt)
      this.token.value = jwt;
  }


}
