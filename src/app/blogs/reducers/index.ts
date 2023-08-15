import * as fromBlogs from './blogs.reducer';
import * as fromBlog from './blog.reducer';
import * as fromRoot from '../../reducers';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export const blogsFeatureKey = 'blogs';

export interface BlogsState {
    [fromBlogs.blogsFeatureKey]: fromBlogs.State;
    [fromBlog.blogFeatureKey]: fromBlog.State;
}

export interface State extends fromRoot.State {
    [blogsFeatureKey]: BlogsState;
}

export function reducers(state: BlogsState | undefined, action: Action) {
    return combineReducers({
        [fromBlogs.blogsFeatureKey]: fromBlogs.reducer,
        [fromBlog.blogFeatureKey]: fromBlog.reducer
    })(state, action);
}

export const selectBlogsState = createFeatureSelector<BlogsState>(blogsFeatureKey);

export const selectBlogsEntitiesState = createSelector(
    selectBlogsState,
    (state) => state.blogs
)

export const {
    selectIds: selectBlogIds,
    selectEntities: selectBlogEntities,
    selectAll: selectAllBlogs,
    selectTotal: selectTotalBlogs
} = fromBlogs.adapter.getSelectors(selectBlogsEntitiesState);

export const selectBlogsLoading = createSelector(
    selectBlogsEntitiesState,
    (state) => state.loading
)

export const selectBlogsError = createSelector(
    selectBlogsEntitiesState,
    (state) => state.error
)

export const selectBlogEntityState = createSelector(
    selectBlogsState,
    (state) => state.blog
)

export const selectBlog = createSelector(
    selectBlogEntityState,
    (state) => state.blog
)

export const selectBlogLoading = createSelector(
    selectBlogEntityState,
    (state) => state.loading
)

export const selectBlogError = createSelector(
    selectBlogEntityState,
    (state) => state.error
)

