import {Injectable} from "@angular/core";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router){

  }

  isAuthentificated(): boolean{
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.route('login');
  }

  route(path: string){
    this.router.navigate(['/'+path]);
  }

  matchPath(path: string): boolean{
    return this.router.url === path;
  }

}
