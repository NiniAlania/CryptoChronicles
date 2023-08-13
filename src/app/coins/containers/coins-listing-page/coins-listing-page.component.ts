import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, from, map, Observable, Subscription } from 'rxjs';
import { CoinMarketData, UserFavorites } from '../../models';
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
  matchingList$!: Observable<boolean[]>;
  loading$!: Observable<boolean>;
  error$: Observable<boolean>;


  
  constructor(private store: Store, private router: Router) { 
    this.coins$ = this.store.select(fromCoins.selectAllCoins);
    this.page$ = this.store.select(fromRoot.selectPage);
    this.pageSize$ = this.store.select(fromCoins.selectPageSize);
    this.currency$ = this.store.select(fromRoot.selectCurrency);
    this.totalCoins$ = this.store.select(fromCoins.selectCoinListTotal);
    this.matchingList$ = this.store.select(fromCoins.selectIsFavorite);
    this.loading$ = this.store.select(fromCoins.selectCoinsAndListLoading);
    this.error$ = this.store.select(fromCoins.selectCoinsAndListError);
  }
  
  ngOnInit() {
    this.store.dispatch(CoinsListingPageActions.enter());

  }

  changePageSize(pageSize: number) {
    this.store.dispatch(CoinsListingPageActions.pageSizeChanged({pageSize}));

  }

  changePage(pageNumber: number) {
    this.router.navigate( 
      ['/coins'],
    { queryParams: { page: pageNumber}},
    )
  }

  toogleFavorites({id, remove}: {id: string, remove: boolean}) {
    if (!remove) {
      this.store.dispatch(CoinsListingPageActions.addToFavorites({id}));
    } else {
      this.store.dispatch(CoinsListingPageActions.removeFromFavorites({id}));
    }
  }
}
