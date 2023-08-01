import { createAction, props } from "@ngrx/store";

export const changeCurrency = createAction(
    '[Drawer] Change currency',
    props<{currency: "usd" | "eur"}>()
)

