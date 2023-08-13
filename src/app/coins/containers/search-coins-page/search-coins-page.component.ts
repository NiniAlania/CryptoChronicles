import { transition, trigger, query, style, stagger, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchPageActions } from '../../actions';
import { Coin, SearchedCoin } from '../../models';

import * as fromCoins from '../../reducers'

@Component({
  selector: 'cc-search-coins-page',
  templateUrl: './search-coins-page.component.html',
  styleUrls: ['./search-coins-page.component.scss']
})
export class SearchCoinsPageComponent implements OnInit {
  searchResult$: Observable<SearchedCoin[]>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;


  constructor(private store: Store, private router: Router) {
    this.searchResult$ = store.select(fromCoins.selectSearchResult);
    this.loading$ = store.select(fromCoins.selectSearchLoading);
    this.error$ = store.select(fromCoins.selectSearchError);
  }

  ngOnInit(): void {
    this.store.dispatch(SearchPageActions.enter());
  }

  searchCoin(event: Event) {
    const searchWord = (event.target as HTMLInputElement).value;
    
    if (searchWord.length > 0) {
      this.store.dispatch(SearchPageActions.search({text: searchWord}));
    } else {
      this.store.dispatch(SearchPageActions.clear());
    }
  }

  coinSelected(id: string) {
    this.router.navigate(['/coins/'+id])
  }
}
