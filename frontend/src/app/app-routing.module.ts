import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CheckComponent} from "./components/check/check.component";
import {IndexComponent} from "./components/index/index.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./classes/auth-guard";
import {LoginGuard} from "./classes/login-guard";

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'login', component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {path: 'check', component: CheckComponent,
    canActivate: [AuthGuard]},
  {path: 'index', component: IndexComponent,
    canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
