import { createReducer, on } from "@ngrx/store";
import { CoinPageActions } from "../actions";
import { CoinDetails, CoinInfo } from "../models";
import { CoinPrice } from "../models/coin-chart.model";

export const coinFeatureKey = 'coin';

export interface State {
    coinDetails: CoinDetails | null
    coinPrices: CoinPrice[]
    coinInfo: CoinInfo | null
    loadingDetails: boolean
    loadingPrices: boolean
    loadingInfo: boolean
    error: boolean
}

export const initialState: State = {
    coinDetails: null,
    coinPrices: [],
    coinInfo: null,
    loadingDetails: false,
    loadingPrices: false,
    loadingInfo: false,
    error: false 
}

export const reducer = createReducer(
    initialState,
    on(
        CoinPageActions.loadCoinDetailsSuccess, 
        (state, {data}) => ({
            ...state, 
            coinDetails: data,
            loadingDetails: false,
        })
    ),
    on(
        CoinPageActions.loadCoinPricesSuccess, 
        (state, {data}) => ({
            ...state, 
            coinPrices: data,
            loadingPrices: false,
        })
    ),
    on(
        CoinPageActions.loadCoinInfoSuccess, 
        (state, {data}) => ({
            ...state, 
            coinInfo: data,
            loadingInfo: false,
        }) 
    ),
    on(
        CoinPageActions.loadCoinDetailsFail,
        CoinPageActions.loadCoinInfoFail,
        CoinPageActions.loadCoinPricesFail,
        (state) => ({
            ...state,
            error: true,
        })
    ),
    on(CoinPageActions.enter, (state) => ({
        ...state, 
        error: false, 
        loadingDetails: true,
        loadingInfo: true,
        loadingPrices: true
    }))
)



