import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './containers/auth-page/auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';



@NgModule({
  declarations: [
    AuthPageComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
