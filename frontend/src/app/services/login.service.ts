import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";

const postOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  // url to api login
  private loginUrl = 'api/login';
  // private loginUrl = 'http://localhost:8080/lab4/api/login';

  login(login: string, password: string) {
    var body = {
      "login": login,
      "password": password
    };
    return this.http.post(this.loginUrl, body, postOptions)
      .subscribe(
        (data: Response) => {
          this.setToken(data);
          this.router.navigate(['/check']);
        },
        err => console.log(err)
      );
  }

  private setToken(authResult) {
    localStorage.setItem('token', authResult['token']);
  }
}
