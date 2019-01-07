import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Token} from "../../token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() login: string;
  @Input() password: string;
  token: string;

  constructor(private loginService: LoginService, private tokenStorage: Token) {
  }

  ngOnInit() {

  }

  test() {
    // localStorage.setItem('cat', 'tom');
  }

  get() {
    // console.log(localStorage.getItem('cat'), '\n', localStorage.getItem('currentUserToken'));
  }


  showToken() {

    // console.log(this.user.login, this.user.password);
    this.loginService.login('dimon', '5678')
    // this.loginService.login(this.login, this.password);
    // this.test();
    // this.get();


  }

}

