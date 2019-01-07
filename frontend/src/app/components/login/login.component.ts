import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() login: string;
  @Input() password: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {

  }

  logIn() {

    // console.log(this.user.login, this.user.password);
    this.loginService.login('dimon', '5678')
    // this.loginService.login(this.login, this.password);
  }
}

