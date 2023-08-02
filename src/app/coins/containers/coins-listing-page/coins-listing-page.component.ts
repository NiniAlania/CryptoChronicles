import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { CoinMarketData } from '../../models';
import * as fromCoins from '../../reducers';
import { CoinsListingPageActions } from '../../actions';
import * as fromRoot from '../../../reducers';
import { Router } from '@angular/router';


@Component({
  selector: 'cc-coins-listing-page',
  templateUrl: './coins-listing-page.component.html',
  styleUrls: ['./coins-listing-page.component.scss']
})
export class CoinsListingPageComponent implements OnInit {
  coins$: Observable<CoinMarketData[]>;
  page$: Observable<number>;
  pageSize$: Observable<number>;
  currency$: Observable<string>;
  totalCoins$: Observable<number>;

  
  constructor(private store: Store, private router: Router) { 
    this.coins$ = this.store.select(fromCoins.selectAllCoins);
    this.page$ = this.store.select(fromCoins.selectPage);
    this.pageSize$ = this.store.select(fromCoins.selectPageSize);
    this.currency$ = this.store.select(fromRoot.selectCurrency);
    this.totalCoins$ = this.store.select(fromCoins.selectCoinListTotal);

  }
  
  ngOnInit() {
    this.store.dispatch(CoinsListingPageActions.enter({}));
    this.coins$.subscribe(coins => console.log(coins));
  }

  changePageSize(pageSize: number) {
    this.store.dispatch(CoinsListingPageActions.enter({pageSize}));

  }

  changePage(pageNumber: number) {
    this.router.navigate( 
      ['/coins'],
    { queryParams: { page: pageNumber}},
    )
  }
}
