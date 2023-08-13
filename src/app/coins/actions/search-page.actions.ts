import { createAction, props } from "@ngrx/store"; 
import { Coin, SearchedCoin } from "../models";

export const searchSuccess = createAction(
    '[Search Page] SearchSuccess',
    props<{data: SearchedCoin[]}>()
)

export const searchFail = createAction(
    '[Search Page] SearchFail'
)

export const search = createAction(
    '[Search Page] Search',
    props<{text: string}>()
)

export const enter = createAction(
    '[Search Page] Enter'
)

export const clear = createAction(
    '[Search Page] Clear'
)