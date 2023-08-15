import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { BlogsService } from "../services";
import { BlogPageActions } from "../actions";
import { Store } from "@ngrx/store";
import { selectId } from "src/app/reducers";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BlogEffects {
    load$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BlogPageActions.enter),
            concatLatestFrom(() => this.store.select(selectId)),
            switchMap(([, id]) => {
                return this.blogsService.getBlog(id).pipe(
                    map(blog => BlogPageActions.loadBlogSuccess({ blog })),
                    catchError(() => of(BlogPageActions.loadBlogFailure()))
                );
            })
        );
    });

    constructor(
        private actions$: Actions,
        private blogsService: BlogsService,
        private store: Store
    ) {}
}