import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {readCommandLineAndConfiguration} from "@angular/compiler-cli/src/main";



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

  // test req body
  // private body = '{"login":"dimon","password":"5678"}';

  login(login: string, password: string) {
    var body = {
      "login": login,
      "password": password
    };
    return this.http.post(this.loginUrl, body, postOptions)
      .subscribe(
        (data: Response) => {

          // this.saveToken(data['token']);
          // console.log(this.tokenStorage.logged);
          this.setToken(data);
          console.log(localStorage.getItem('token'));
          this.redirectToIndex();

        },
        err => console.log(err)
      );
  }

  private setToken(authResult){
    localStorage.setItem('token',authResult['token']);
    //todo make login page unreachebale when logged in
    //todo make history dots page on index
    //todo rewrite canvas
    //todo make form on checkpage
  }


  redirectToIndex(){
    //todo: fix navigation work when logout and log in.
    this.router.navigate(['/index']);
  }


}
