import { createAction, props } from "@ngrx/store";
import { CoinDetails, CoinInfo } from "../models";
import { CoinPrice } from "../models/coin-chart.model";

export const enter = createAction(
    '[Coin Page] Enter',
)

export const loadCoinDetailsSuccess = createAction(
    '[Coin Page] Load Coin Details Success',
    props<{ data: CoinDetails }>()
)

export const loadCoinPricesSuccess = createAction(
    '[Coin Page] Load Coin Prices Success',
    props<{ data: CoinPrice[] }>()
)

export const loadCoinInfoSuccess = createAction(
    '[Coin Page] Load Coin Info Success',
    props<{data: CoinInfo}>()
)

