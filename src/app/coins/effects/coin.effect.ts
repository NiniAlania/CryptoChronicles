import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { DrawerActions } from "src/app/core/actions";
import { selectCurrency, selectId } from "src/app/reducers";
import { CoinPageActions } from "../actions";
import { defaultCoinDetailFilter } from "../models";
import { defaultCoinChartFilter } from "../models/coin-chart-filter-.model";
import { CoinGeckoService } from "../services";

@Injectable()
export class CoinEffects {

    reload$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DrawerActions.changeCurrency),
            switchMap(() => {
                return of(CoinPageActions.enter());
            })
        )
    })


    loadCoinDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinPageActions.enter),
            concatLatestFrom(
                () => [
                    this.store.select(selectId),
                    this.store.select(selectCurrency)
                ]
            ),
            switchMap(([, id, currency]) => {
                const filter = defaultCoinDetailFilter(id, currency);
                return this.coinGeckoService.getCoinDetails(filter).pipe(
                    map((data) => {
                        return CoinPageActions.loadCoinDetailsSuccess({data});
                    }),
                    catchError(() => {
                        return of(CoinPageActions.loadCoinDetailsFail());
                    })
                );
            })
        );
    });

    loadCoinPrices$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinPageActions.enter),
            concatLatestFrom(
                () => [
                    this.store.select(selectId),
                    this.store.select(selectCurrency)
                ]
            ),
            switchMap(([, id, currency]) => {
                const filter = defaultCoinChartFilter(id, currency);
                return this.coinGeckoService.getCoinChart(filter).pipe(
                    map((data) => {
                        return CoinPageActions.loadCoinPricesSuccess({data});
                    }),
                    catchError(() => {
                        return of(CoinPageActions.loadCoinPricesFail());
                    })
                );
            })
        );
    });

    loadCoinInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CoinPageActions.enter),
            concatLatestFrom(
                () => [
                    this.store.select(selectId),
                ]
            ),
            switchMap(([, id])  => {
                return this.coinGeckoService.getCoinInfo(id).pipe(
                    map((data) => {
                        return CoinPageActions.loadCoinInfoSuccess({data});
                    }),
                    catchError(() => {
                        return of(CoinPageActions.loadCoinInfoFail());
                    })
                )
            })
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private coinGeckoService: CoinGeckoService
    ) {}
}