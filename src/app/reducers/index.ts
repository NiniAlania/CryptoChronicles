import { InjectionToken } from "@angular/core";
import { RouterReducerState, getRouterSelectors, routerReducer } from "@ngrx/router-store";
import { Action, ActionReducerMap, createFeatureSelector, createSelector, select } from "@ngrx/store";

import * as fromCurrency from '../core/reducers/currency.reducer';

export interface State {
    [fromCurrency.currencyFeatureKey]: fromCurrency.State;
    router: RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
>('Root reducers token', {
    factory: () => ({
        [fromCurrency.currencyFeatureKey]: fromCurrency.reducer,
        router: routerReducer
    }),
});

export const selectCurrencyState = createFeatureSelector<fromCurrency.State>
(fromCurrency.currencyFeatureKey);

export const selectCurrency = createSelector(
    selectCurrencyState,
    fromCurrency.selectCurrency
)

export const { selectRouteData, selectQueryParam } = getRouterSelectors();