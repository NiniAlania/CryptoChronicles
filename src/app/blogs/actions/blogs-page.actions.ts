import { createAction, props } from "@ngrx/store"
import { Blog } from "../models"

export const enter = createAction(
    '[Blogs Page] Enter'
)

export const loadBlogsSuccess = createAction(
    '[Blogs Page] Load Blogs Success',
    props<{ blogs: Blog[] }>()
)

export const loadBlogsFailure = createAction(
    '[Blogs Page] Load Blogs Failure'
)