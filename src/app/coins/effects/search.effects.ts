import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, switchMap, tap } from "rxjs";
import { SearchPageActions } from "../actions";
import { selectCoinListAll } from "../reducers";

@Injectable()
export class SearchEffects {
    searchCoins$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(SearchPageActions.search),
            tap(({text}) => console.log(text)),
            concatLatestFrom(() => 
            this.store.select(selectCoinListAll)),
            switchMap(([{text}, coins]) => {
                const result = coins.filter(
                    (coin) => coin.name.toLowerCase().startsWith(text)
                ).slice(0,5);
                return of(SearchPageActions.searchSuccess({data: result}));
            })
        )
    });

    constructor(private actions$: Actions, private store: Store) {}
}