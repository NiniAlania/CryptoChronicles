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
  styleUrls: ['./search-coins-page.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
          { optional: true }
        ),
        query(':leave',
          animate('200ms', style({ opacity: 0 })),
          { optional: true }
        )
      ])
    ])
  ],  
})
export class SearchCoinsPageComponent implements OnInit {
  searchResult$: Observable<SearchedCoin[]>;


  constructor(private store: Store, private router: Router) {
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

  coinSelected(id: string) {
    this.router.navigate(['/coins/'+id])
  }
}
