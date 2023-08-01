import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { DrawerActions } from "../actions";

export const currencyFeatureKey = "currency";

export interface State {
    currency: 'usd' | 'eur' ;
} 

const initialState: State = { 
    currency : 'usd'
}
 
export const reducer = createReducer(
    initialState,
    on(DrawerActions.changeCurrency, (state, {currency}) => ({currency}))
)

export const selectCurrency = (state: State) => state.currency;