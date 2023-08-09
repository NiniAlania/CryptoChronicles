import { createReducer, on } from "@ngrx/store";
import { CoinPageActions } from "../actions";
import { CoinDetails, CoinInfo } from "../models";
import { CoinPrice } from "../models/coin-chart.model";

export const coinFeatureKey = 'coin';

export interface State {
    coinDetails: CoinDetails | null
    coinPrices: CoinPrice[]
    coinInfo: CoinInfo | null
}

export const initialState: State = {
    coinDetails: null,
    coinPrices: [],
    coinInfo: null
}

export const reducer = createReducer(
    initialState,
    on(CoinPageActions.loadCoinDetailsSuccess, (state, {data}) => ({...state, coinDetails: data})),
    on(CoinPageActions.loadCoinPricesSuccess, (state, {data}) => ({...state, coinPrices: data})),
    on(CoinPageActions.loadCoinInfoSuccess, (state, {data}) => ({...state, coinInfo: data}) )
)



