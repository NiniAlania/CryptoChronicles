import { createAction, props } from "@ngrx/store";
import { Coin, CoinMarketData } from "../models";


export const loadCoinMarketsSuccess = createAction(
    '[Coins/API] Load Coin Markets Success',
    props<{ data: CoinMarketData[], isFavorite: boolean[] }>()
);

export const loadCoinListSuccess = createAction(
    '[Coins/API] Load Coin List Sucess',
    props<{data: Coin[]}>()
);


export const enter = createAction(
    '[Coins Listing Page] Enter'
);

export const addToFavorites = createAction(
    '[Coins Listing Page] Add To Favorites',
    props<{id: string}>()
);

export const removeFromFavorites = createAction(
    '[Coins Listing Page] Remove From Favorites',
    props<{id: string}>()
)

export const pageSizeChanged = createAction(
    '[Coin Listing Page] Page Size Changed',
    props<{pageSize: number}>()
)