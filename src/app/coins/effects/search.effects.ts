import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { SearchPageActions } from "../actions";
import { selectCoinListAll } from "../reducers";
import { CoinGeckoService } from "../services";

@Injectable()
export class SearchEffects {
    searchCoins$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(SearchPageActions.search),
            switchMap(({text}) => {
                return this.coinGeckoService.getSearchedCoinInfo(text).pipe(
                    map((data) => {
                        return SearchPageActions.searchSuccess({data});
                    }),
                    catchError(() => of(SearchPageActions.searchFail()))
                )
           })
         )
    });

    constructor(private actions$: Actions, private store: Store, private coinGeckoService: CoinGeckoService) {}
}