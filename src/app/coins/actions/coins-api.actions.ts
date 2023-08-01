import { createAction, props } from "@ngrx/store";
import { CoinMarketData, CoinMarketFilter } from "../models";

export const loadCoinMarkets = createAction(
    '[Coins/API] Load Coin Markets',
    props<{ filter: CoinMarketFilter }>()
);

export const loadCoinMarketsSuccess = createAction(
    '[Coins/API] Load Coin Markets Success',
    props<{ data: CoinMarketData[], page: number, pageSize: number }>()
);