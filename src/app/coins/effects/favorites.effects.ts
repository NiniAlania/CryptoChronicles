import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { switchMap, tap, map, of, delay, catchError } from "rxjs";
import { DrawerActions } from "src/app/core/actions";
import { selectCurrency, selectPage, selectQueryParam } from "src/app/reducers";
import { CoinsListingPageActions, FavoritesListingPageActions } from "../actions";
import { defaultCoinMarketFilter, UserFavorites } from "../models";
import { selectPageSize } from "../reducers";
import { CoinGeckoService } from "../services";
import { FavoritesService } from "../services/favorites.service";
import { selectUser } from "src/app/authorization/reducers";
import { user } from "@angular/fire/auth";

@Injectable()
export class FavoritesEffects {
    addToFavorites = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.addToFavorites),
            concatLatestFrom(() => this.store.select(selectUser)),
            tap(([{id}, user]) => this.favoritesService.addToFavorites(user?.uid, id))
        );
    }, {dispatch: false});

    removeToFavorites = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinsListingPageActions.removeFromFavorites, FavoritesListingPageActions.removeFromFavorites),
            concatLatestFrom(() => this.store.select(selectUser)),
            tap(([{id}, user]) => this.favoritesService.removeFromFavorites(user?.uid, id))
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
            concatLatestFrom(() => this.store.select(selectUser)),
            switchMap(([, user]) => this.favoritesService.loadFromFavorites(user?.uid)),
            concatLatestFrom(() => [
                this.store.select(selectPageSize),
                this.store.select(selectPage),
                this.store.select(selectCurrency)
            ]),
            switchMap(([uf, pageSize, page, currency]) => {
                if (uf?.ids && uf?.ids.length == 0) {
                    return of(FavoritesListingPageActions.loadFavoritesFail());
                }             
                const filter = defaultCoinMarketFilter(page, currency, pageSize, uf?.ids || []);
                return this.coinGeckoService.getCoinMarkets(filter).pipe(
                    map((data) => FavoritesListingPageActions.loadFavoritesSuccess({ data })),
                    catchError(() => of(FavoritesListingPageActions.loadFavoritesFail()))
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