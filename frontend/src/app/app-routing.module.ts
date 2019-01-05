import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CheckComponent} from "./check/check.component";
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'check', component: CheckComponent},
  {path: 'index', component: IndexComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
