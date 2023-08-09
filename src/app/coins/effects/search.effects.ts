import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs";
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
                        return SearchPageActions.searchSuccess({data})
                    })
                )
           })
         )
    });

    constructor(private actions$: Actions, private store: Store, private coinGeckoService: CoinGeckoService) {}
}

// export class SearchEffects {
//     searchCoins$ = createEffect( () => {
//         return this.actions$.pipe(
//             ofType(SearchPageActions.search),
//             switchMap(([{text}, coins]) => {
//                 const result = coins.filter(
//                     (coin) => coin.name.toLowerCase().startsWith(text)
//                 ).slice(0,5);
//                 return of(SearchPageActions.searchSuccess({data: result}));
//             })
//         )
//     });

//     constructor(private actions$: Actions, private store: Store) {}
// }