import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { cpuUsage } from 'process';
import { DrawerActions } from '../../actions';

@Component({
  selector: 'cc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto-chronicles';

  constructor(private store: Store) {}

  currencyChanged(currency: 'usd' | 'eur') {
    this.store.dispatch(DrawerActions.changeCurrency({currency}));
  }


}
