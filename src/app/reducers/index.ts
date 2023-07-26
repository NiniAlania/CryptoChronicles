import { InjectionToken } from "@angular/core";
import { RouterReducerState, getRouterSelectors, routerReducer } from "@ngrx/router-store";
import { Action, ActionReducerMap } from "@ngrx/store";

export interface State {
    router: RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
>('Root reducers token', {
    factory: () => ({
        router: routerReducer,
    }),
});

export const { selectRouteData } = getRouterSelectors();