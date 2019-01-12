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
    this.loginService.login(this.login, this.password);
  }
}

