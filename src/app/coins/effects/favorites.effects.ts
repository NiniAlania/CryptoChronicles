import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { switchMap, tap, map, of, delay } from "rxjs";
import { DrawerActions } from "src/app/core/actions";
import { selectCurrency, selectPage, selectQueryParam } from "src/app/reducers";
import { CoinsListingPageActions, FavoritesListingPageActions } from "../actions";
import { defaultCoinMarketFilter, UserFavorites } from "../models";
import { selectPageSize } from "../reducers";
import { CoinGeckoService } from "../services";
import { FavoritesService } from "../services/favorites.service";

@Injectable()
export class FavoritesEffects {
    addToFavorites = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.addToFavorites),
            tap(({id}) => this.favoritesService.addToFavorites("nini", id))
        );
    }, {dispatch: false});

    removeToFavorites = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.removeFromFavorites, FavoritesListingPageActions.removeFromFavorites),
            tap(({id}) => this.favoritesService.removeFromFavorites("nini", id))
        );
    }, {dispatch: false});

    loadFavoritesCoinsListing$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                FavoritesListingPageActions.enter, 
                FavoritesListingPageActions.pageSizeChanged, 
                CoinsListingPageActions.removeFromFavorites, 
                FavoritesListingPageActions.removeFromFavorites
            ),
            switchMap(() => this.favoritesService.loadFromFavorites('nini')),
            concatLatestFrom(() => [
                this.store.select(selectPageSize),
                this.store.select(selectPage),
                this.store.select(selectCurrency)
            ]),
            switchMap(([{ids}, pageSize, page, currency]) => {
                if (ids.length == 0) {
                    return of(CoinsListingPageActions.loadCoinListSuccess({ data: []}));
                } 
                const filter = defaultCoinMarketFilter(page, currency, pageSize, ids);
                return this.coinGeckoService.getCoinMarkets(filter).pipe(
                    map((data) => FavoritesListingPageActions.loadFavoritesSuccess({ data })),
                );
            })
        )
    })  

    constructor(
        private actions$: Actions, 
        private favoritesService: FavoritesService, 
        private store: Store,
        private coinGeckoService: CoinGeckoService) {}
}