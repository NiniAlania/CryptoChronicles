import { createAction, props } from "@ngrx/store";
import { CoinMarketData } from "../models";

export const enter = createAction(
    '[Favorites Listing Page] Enter'
);

export const loadFavoritesSuccess = createAction(
    '[Coins/API] Load Favorites Success',
    props<{data: CoinMarketData[]}>()
);


export const pageSizeChanged = createAction(
    '[Favorites Listing Page] Page Size Changed',
    props<{pageSize: number}>()
)

export const removeFromFavorites = createAction(
    '[Favorites Listing Page] Remove From Favorites',
    props<{ id: string }>()
)