import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { cpuUsage } from 'process';
import { DrawerActions } from '../../actions';
import { AuthPageActions } from 'src/app/authorization/actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/authorization/models';
import { selectUser } from 'src/app/authorization/reducers';

@Component({
  selector: 'cc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crypto-chronicles';
  user$: Observable<User | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
  }

  currencyChanged(currency: 'usd' | 'eur') {
    this.store.dispatch(DrawerActions.changeCurrency({currency}));
  }

  ngOnInit() {
    this.store.dispatch(AuthPageActions.autoLogin());
  }

  logout() {
    this.store.dispatch(AuthPageActions.logout());
  }

}
