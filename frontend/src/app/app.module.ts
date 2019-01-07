import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {IndexComponent} from './components/index/index.component';
import {CheckComponent} from './components/check/check.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import {Token} from "./token";
import {AuthGuard} from "./auth-guard";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CheckComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [Token, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
