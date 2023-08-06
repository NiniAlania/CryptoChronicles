import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { CoinsListingPageActions, SearchPageActions } from "../actions";
import { defaultCoinMarketFilter } from "../models";
import { map, of, switchMap, tap } from "rxjs";
import { CoinGeckoService } from "src/app/coins/services";
import { Store } from "@ngrx/store";
import { selectPage, selectQueryParam } from "src/app/reducers";
import { selectCurrency } from "../../reducers"
import { DrawerActions } from "src/app/core/actions";
import { selectPageSize } from "../reducers";
import { routerNavigatedAction } from "@ngrx/router-store";
import { FavoritesService } from "../services/favorites.service";
 
@Injectable()
export class CoinsEffects {
    loadCoinsMarkets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.enter, DrawerActions.changeCurrency, routerNavigatedAction, CoinsListingPageActions.pageSizeChanged),
            switchMap(() => this.favoriteService.loadFromFavorites("nini")),
            concatLatestFrom(() => [
                this.store.select(selectPage),
                this.store.select(selectPageSize),
                this.store.select(selectCurrency)
            ]),
            switchMap(([{ids}, page, pageSize, currency]) => {
                const filter = defaultCoinMarketFilter(page, currency, pageSize);
                return this.coinGeckoService.getCoinMarkets(filter).pipe(
                    map((data) => {
                        const isFavorite = data.map(c => ids.includes(c.id))
                        return CoinsListingPageActions.loadCoinMarketsSuccess({ data, isFavorite })
                    }),
                );
            }),
        );
    });

    loadCoins$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.enter, SearchPageActions.enter),
            switchMap(() => {
                return this.coinGeckoService.getCoinList().pipe(
                    map((data) => CoinsListingPageActions.loadCoinListSuccess({data}))
                );
            }),  
        );
    });
 
    constructor(
        private actions$: Actions, 
        private coinGeckoService: CoinGeckoService, 
        private store: Store,
        private favoriteService: FavoritesService) {}
}