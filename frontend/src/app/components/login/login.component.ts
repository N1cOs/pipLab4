import {Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: string;
  password: string;
  authError:boolean;
  errorMessage:string;

  constructor(private loginService: LoginService, private router:Router, private ts:Title) {
    ts.setTitle('Вход');
  }

  logIn() {
    this.loginService.login(this.login, this.password).subscribe(
      (data) => {
        localStorage.setItem('token', data['token']);
        this.router.navigate(['/check']);
      },
      error => this.handleError(error)
    );

  }

  private handleError(error:HttpErrorResponse){
    this.authError = true;
    if(error.status == 401)
      this.errorMessage = 'Введен неверный логин или пароль';
  }
}

