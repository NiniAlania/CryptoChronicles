import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Blog } from "../models";
import { sortedChanges } from "@angular/fire/firestore";
import { BlogsPageActions } from "../actions";
import { createReducer, on } from "@ngrx/store";

export const blogsFeatureKey = 'blogs';

export interface State extends EntityState<Blog> {
    loading: boolean,
    error: boolean
}

export const adapter = createEntityAdapter<Blog>({
    selectId: (blog: Blog) => blog.id,
    sortComparer: (a: Blog, b: Blog) => a.createdAt.seconds > b.createdAt.seconds ? -1 : 1
});

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: false
});

export const reducer = createReducer(
    initialState,
    on(
        BlogsPageActions.enter,
        (state) => ({
            ...state,
            loading: true,
            error: false
        })
    ),
    on(
        BlogsPageActions.loadBlogsSuccess,
        (state, { blogs }) => ({
            ...adapter.setAll(blogs, state),
            loading: false,
            error: false
        })
    ),
    on(
        BlogsPageActions.loadBlogsFailure,
        (state) => ({
            ...adapter.setAll([], state),
            loading: false,
            error: true
        })
    )
)