import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoinMarketData } from '../../models';
import * as fromCoins from '../../reducers';
import { CoinsListingPageActions } from '../../actions';

@Component({
  selector: 'cc-coins-listing-page',
  templateUrl: './coins-listing-page.component.html',
  styleUrls: ['./coins-listing-page.component.scss']
})
export class CoinsListingPageComponent implements OnInit {
  coins$: Observable<CoinMarketData[]>;
  
  constructor(private store: Store) { 
    this.coins$ = this.store.select(fromCoins.selectAllCoins);
  }
  
  ngOnInit() {
    this.store.dispatch(CoinsListingPageActions.enter());
    this.coins$.subscribe(coins => console.log(coins));
  }
}
