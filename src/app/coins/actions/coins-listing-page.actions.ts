import { createAction, props } from "@ngrx/store";

export const enter = createAction(
    '[Coins Listing Page] Enter',
    props<{pageSize?: number}>());