import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";
import {Observable} from "rxjs";
import {Token} from "../token";
import {stringify} from "querystring";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  token: Observable<Token>;
  sToken: Token
  tokenBody: string;
  constructor(private loginService: LoginService) {

  }

  ngOnInit() {

  }
  rockLogin()  {
    this.token = this.loginService.login();
    this.token.subscribe(event => this.sToken = event);
}
}
