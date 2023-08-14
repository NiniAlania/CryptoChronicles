import { createAction, props } from "@ngrx/store";
import { Blog } from "../models";

export const enter = createAction(
    '[Blog Page] Enter'
)

export const loadBlogSuccess = createAction(
    '[Blog Page] Load Blog Success',
    props<{ blog: Blog | null }>()
)

export const loadBlogFailure = createAction(
    '[Blog Page] Load Blog Failure'
)