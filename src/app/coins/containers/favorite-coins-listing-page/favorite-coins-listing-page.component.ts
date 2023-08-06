import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoinMarketData } from '../../models';

import * as fromCoins from '../../reducers';
import * as fromRoot from '../../../reducers';
import { FavoritesListingPageActions } from '../../actions';

@Component({
  selector: 'cc-favorite-coins-listing-page',
  templateUrl: './favorite-coins-listing-page.component.html',
  styleUrls: ['./favorite-coins-listing-page.component.scss']
})
export class FavoriteCoinsListingPageComponent implements OnInit {

  favoriteCoins$: Observable<CoinMarketData[]>;
  page$: Observable<number>;
  pageSize$: Observable<number>;
  currency$: Observable<string>;
  totalCoins$:Observable<number>;
  matchingList: boolean[] = []

  constructor(private store: Store, private router: Router){
    this.favoriteCoins$ = this.store.select(fromCoins.selecctAllFavorites);
    this.page$ = this.store.select(fromRoot.selectPage);
    this.pageSize$ = this.store.select(fromCoins.selectPageSize);
    this.currency$ = this.store.select(fromRoot.selectCurrency);
    this.totalCoins$ = this.store.select(fromCoins.selectFavoritesTotal);
  }

  ngOnInit() {
    this.store.dispatch(FavoritesListingPageActions.enter());
    this.totalCoins$.subscribe((total) => {
      this.matchingList = Array.from({ length: total }, () => true);
    });
  }

  changePageSize(pageSize: number) {
    this.store.dispatch(FavoritesListingPageActions.pageSizeChanged({pageSize}));

  }

  changePage(pageNumber: number) {
    this.router.navigate( 
      ['/coins/favorites'],
    { queryParams: { page: pageNumber}},
    )
  }

  removeFromFavorites({id}: {id: string, remove: boolean}) {
    this.store.dispatch(FavoritesListingPageActions.removeFromFavorites({id}))
  }
}
