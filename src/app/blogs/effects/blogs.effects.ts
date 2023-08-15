import { Injectable } from "@angular/core";
import { BlogsService } from "../services";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BlogsPageActions } from "../actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BlogsEffects {
    load$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BlogsPageActions.enter),
            switchMap(() => {
                return this.blogsService.getBlogs().pipe(
                    map(blogs => BlogsPageActions.loadBlogsSuccess({ blogs })),
                    catchError(() => of(BlogsPageActions.loadBlogsFailure()))
                );
            }),
        );
    });

    constructor(
        private actions$: Actions,
        private blogsService: BlogsService,
    ) {}
}