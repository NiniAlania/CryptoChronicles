import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoinsApiActions, CoinsListingPageActions } from "../actions";
import { defaultCoinMarketFilter } from "../models";
import { map, of, switchMap } from "rxjs";
import { CoinGeckoService } from "src/app/core/services";

@Injectable()
export class CoinsEffects {
    loadCoinsListing$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.enter),
            switchMap(() => {
                const filter = defaultCoinMarketFilter();
                return of(CoinsApiActions.loadCoinMarkets({ filter }));
            }),
        );
    });

    loadCoinsMarkets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsApiActions.loadCoinMarkets),
            switchMap(({ filter }) => {
                return this.coinGeckoService.getCoinMarkets(filter).pipe(
                    map((data) => CoinsApiActions.loadCoinMarketsSuccess({ data })),
                );
            }),
        );
    });

    constructor(private actions$: Actions, private coinGeckoService: CoinGeckoService) {}
}