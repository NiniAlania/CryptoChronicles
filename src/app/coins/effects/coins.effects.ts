import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { CoinsApiActions, CoinsListingPageActions } from "../actions";
import { defaultCoinMarketFilter } from "../models";
import { map, of, switchMap, tap } from "rxjs";
import { CoinGeckoService } from "src/app/coins/services";
import { Store } from "@ngrx/store";
import { selectQueryParam } from "src/app/reducers";
import { selectCurrency } from "../../reducers"
import { DrawerActions } from "src/app/core/actions";
import { selectPageSize } from "../reducers";
import { routerNavigatedAction } from "@ngrx/router-store";
 
@Injectable()
export class CoinsEffects {
    reload$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DrawerActions.changeCurrency, routerNavigatedAction),
            concatLatestFrom(() => this.store.select(selectPageSize)),
            switchMap(([, pageSize]) => of(CoinsListingPageActions.enter({pageSize})))
        );
    });
 
    loadCoinsListing$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.enter),
            concatLatestFrom(() => [
                this.store.select(selectQueryParam('page')),
                this.store.select(selectCurrency)
            ]),
            tap(([{pageSize}, page, currency]) => console.log(pageSize, page, currency)),
            switchMap(([{pageSize}, page, currency]) => {
                const filter = defaultCoinMarketFilter(page, currency, pageSize);
                return of(CoinsApiActions.loadCoinMarkets({ filter }));
            }),
        );
    });
 
    loadCoinsMarkets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsApiActions.loadCoinMarkets),
            switchMap(({ filter }) => {
                return this.coinGeckoService.getCoinMarkets(filter).pipe(
                    map((data) => CoinsApiActions.loadCoinMarketsSuccess({ data, page: filter.page, pageSize: filter.perPage })),
                );
            }),
        );
    });

    loadCoins$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.enter),
            switchMap(() => {
                return this.coinGeckoService.getCoinList().pipe(
                    map((data) => CoinsApiActions.loadCoinListSuccess({data}))
                );
            }),  
        );
    });
 
    constructor(private actions$: Actions, private coinGeckoService: CoinGeckoService, private store: Store) {}
}