import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthPageActions } from '../../actions';
import { LoginData, SignUpData, User } from '../../models';
import { selectError, selectLoading, selectUser } from '../../reducers';

@Component({
  selector: 'cc-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  title: string = 'Sign In';
  link: string = 'Not Registered? Sign Up Here';
  registered: boolean = true;
  loading$: Observable<boolean | null>
  error$: Observable<string | null>

  constructor(
    private store: Store
  ) {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  changeComponent() {
    if(this.title === 'Sign In') {
      this.title = 'Sign Up';
      this.link = 'Already Registered? Log In Here';
      this.registered = false
    } else {
      this.title = 'Sign In';
      this.link = 'Not Registered? Sign Up Here';
      this.registered = true;
    }
  }

  signUp(signUpData: SignUpData) {
    this.store.dispatch(AuthPageActions.signUp({data: signUpData}))
  }

  login(loginData: LoginData) {
    this.store.dispatch(AuthPageActions.logIn({data: loginData}))
  }

  onHandleError() {
    this.store.dispatch(AuthPageActions.clearError());
  }

  ngOnInit(): void {
  }
}
