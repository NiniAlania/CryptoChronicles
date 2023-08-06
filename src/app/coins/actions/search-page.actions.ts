import { createAction, props } from "@ngrx/store"; 
import { Coin } from "../models";

export const searchSuccess = createAction(
    '[Search Page] SearchSuccess',
    props<{data: Coin[]}>()
)

export const search = createAction(
    '[Search Page] Search',
    props<{text: string}>()
)

export const enter = createAction(
    '[Search Page] Enter'
)