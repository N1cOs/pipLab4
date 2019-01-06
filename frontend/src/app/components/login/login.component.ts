import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {User} from "../../classes/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() login: string;
  @Input() password: string;
  token: string;
  constructor(private loginService: LoginService) {

  }

  ngOnInit() {

  }

  showToken() {

    // console.log(this.user.login, this.user.password);
    let classProps = Object.keys(this.loginService.login(this.login, this.password)
      .subscribe((res: Response) => this.token = res['token']));
  }

}

