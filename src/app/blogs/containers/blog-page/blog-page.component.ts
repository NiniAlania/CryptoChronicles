import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromBlogs from '../../reducers';
import { Blog } from '../../models';
import { BlogPageActions } from '../../actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  blog$: Observable<Blog | null>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(
    private store: Store,
    private location: Location
  ) {
    this.blog$ = this.store.select(fromBlogs.selectBlog);
    this.loading$ = this.store.select(fromBlogs.selectBlogLoading);
    this.error$ = this.store.select(fromBlogs.selectBlogError);
  }

  ngOnInit(): void {
    this.store.dispatch(BlogPageActions.enter());
  }

  back() {
    this.location.back();
  }
}
