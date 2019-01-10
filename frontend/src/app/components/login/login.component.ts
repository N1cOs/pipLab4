import {Component, Input} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() login: string;
  @Input() password: string;

  constructor(private loginService: LoginService) {

  }

  logIn() {
    console.log(this.login, this.password);
    this.loginService.login(this.login, this.password);
  }
}

