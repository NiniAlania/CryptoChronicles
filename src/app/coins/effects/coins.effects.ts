import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { CoinsListingPageActions, SearchPageActions } from "../actions";
import { defaultCoinMarketFilter } from "../models";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CoinGeckoService } from "src/app/coins/services";
import { Store } from "@ngrx/store";
import { selectPage, selectQueryParam } from "src/app/reducers";
import { selectCurrency } from "../../reducers"
import { DrawerActions } from "src/app/core/actions";
import { selectPageSize } from "../reducers";
import { routerNavigatedAction } from "@ngrx/router-store";
import { FavoritesService } from "../services/favorites.service";
import { selectUser } from "src/app/authorization/reducers";
import { AuthPageActions } from "src/app/authorization/actions";
 
@Injectable()
export class CoinsEffects {
    loadCoinsMarkets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.enter, DrawerActions.changeCurrency, routerNavigatedAction, CoinsListingPageActions.pageSizeChanged),
            concatLatestFrom(() => this.store.select(selectUser)),
            switchMap(([, user]) => this.favoriteService.loadFromFavorites(user?.uid)),
            concatLatestFrom(() => [
                this.store.select(selectPage),
                this.store.select(selectPageSize),
                this.store.select(selectCurrency)
            ]),
            switchMap(([uf, page, pageSize, currency]) => {
                const filter = defaultCoinMarketFilter(page, currency, pageSize);
                return this.coinGeckoService.getCoinMarkets(filter).pipe(
                    map((data) => {
                        const isFavorite = data.map(c => uf ? uf.ids.includes(c.id) : false)
                        return CoinsListingPageActions.loadCoinMarketsSuccess({ data, isFavorite })
                    }),
                    catchError(() => of(CoinsListingPageActions.loadCoinMarketsFail()))
                );
            }),
        );
    });

    loadCoins$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.enter),
            switchMap(() => {
                return this.coinGeckoService.getCoinList().pipe(
                    map((data) => CoinsListingPageActions.loadCoinListSuccess({data})),
                    catchError(() => of(CoinsListingPageActions.loadCoinListFail()))
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