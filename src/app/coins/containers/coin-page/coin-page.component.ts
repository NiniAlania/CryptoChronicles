import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { CoinPageActions } from '../../actions';
import { CoinDetails, CoinInfo } from '../../models';
import { CoinPrice } from '../../models/coin-chart.model';
import { Location } from '@angular/common'
import * as fromCoins from '../../reducers';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'cc-coin-page',
  templateUrl: './coin-page.component.html',
  styleUrls: ['./coin-page.component.scss']
})
export class CoinPageComponent implements OnInit {
  coinDetails$: Observable<CoinDetails | null>;
  coinPrices$: Observable<CoinPrice[]>;
  coinInfo$: Observable<CoinInfo | null>;
  currency$: Observable<string>;
  error$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private location: Location
  ) {
    this.coinDetails$ = this.store.select(fromCoins.selectCoinDetails);
    this.coinPrices$ = this.store.select(fromCoins.selectCoinPrices);
    this.coinInfo$ =this.store.select(fromCoins.selectCoinInfo);
    this.currency$ = this.store.select(fromRoot.selectCurrency);
    this.error$ = this.store.select(fromCoins.selectCoinError);
    this.loading$ = this.store.select(fromCoins.selectCoinLoading);
  }

  ngOnInit() {
    this.store.dispatch(CoinPageActions.enter());
  }

  back() {
    this.location.back();
  }
}
