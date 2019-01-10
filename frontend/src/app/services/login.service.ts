import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from '../../environments/environment';

const postOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = environment.apiUrl + '/login';

  constructor(private http: HttpClient, private router: Router) {

  }

  login(login: string, password: string) {
    const body = {
      "login": login,
      "password": password
    };
    return this.http.post(this.loginUrl, body, postOptions)
      .subscribe(
        (data: Response) => {
          this.setToken(data);
          this.router.navigate(['/check']);
        }
      );
  }

  private setToken(authResult) {
    localStorage.setItem('token', authResult['token']);
  }
}
