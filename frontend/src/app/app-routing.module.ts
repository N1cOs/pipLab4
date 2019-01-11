import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckComponent} from './components/check/check.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './classes/auth-guard';
import {LoginGuard} from './classes/login-guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'check', component: CheckComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
