import {Injectable} from "@angular/core";
import {Token} from "../token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private tokenStorage: Token){

  }

  isAuthentificated(): boolean{
    if (this.tokenStorage.logged)
      return true;
    else
      return false;
  }

  logOut(){
    this.tokenStorage.logged = false;
    this.tokenStorage.value = '';
  }

}
