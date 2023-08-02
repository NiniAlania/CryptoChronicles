import { createAction, props } from "@ngrx/store";
import { Coin, CoinMarketData, CoinMarketFilter } from "../models";

export const loadCoinMarkets = createAction(
    '[Coins/API] Load Coin Markets',
    props<{ filter: CoinMarketFilter }>()
);

export const loadCoinMarketsSuccess = createAction(
    '[Coins/API] Load Coin Markets Success',
    props<{ data: CoinMarketData[], page: number, pageSize: number }>()
);

export const loadCoinListSuccess = createAction(
    '[Coins/API] Load Coin List Sucess',
    props<{data: Coin[]}>()
);