import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchPageActions } from '../../actions';
import { Coin } from '../../models';

import * as fromCoins from '../../reducers'

@Component({
  selector: 'cc-search-coins-page',
  templateUrl: './search-coins-page.component.html',
  styleUrls: ['./search-coins-page.component.scss']
})
export class SearchCoinsPageComponent implements OnInit {
  searchResult$: Observable<Coin[]>;


  constructor(private store: Store) {
    this.searchResult$ = store.select(fromCoins.selectSearchResult)
  }

  ngOnInit(): void {
    this.store.dispatch(SearchPageActions.enter());
  }

  searchCoin(event: Event) {

    const searchWord = (event.target as HTMLInputElement).value;
    
    if (searchWord.length > 0) {
      console.log(searchWord);
      this.store.dispatch(SearchPageActions.search({text: searchWord}));
    }
  }
}
