import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services';
import { Timestamp } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { BlogsPageActions } from '../../actions';
import { Observable } from 'rxjs';
import * as fromBlogs from '../../reducers';
import { Blog } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.scss']
})
export class BlogsPageComponent implements OnInit {
  blogs$: Observable<Blog[]>
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(
    private blogsService: BlogsService,
    private store: Store,
    private router: Router
  ) { 
    this.blogs$ = this.store.select(fromBlogs.selectAllBlogs);
    this.loading$ = this.store.select(fromBlogs.selectBlogsLoading);
    this.error$ = this.store.select(fromBlogs.selectBlogsError);
  }

  ngOnInit(): void {
    // this.blogsService.getBlogs().subscribe(blogs => console.log(blogs));
    // this.blogsService.getBlog('zoro').subscribe(blog => console.log(blog));
    // this.blogsService.addBlog({
    //   id: '',
    //   title: 'Sam Bankman-Fried Jailed Ahead of Trial',
    //   author: 'Elizabeth Napolitano',
    //   content: 'Bankman-Fried was accused of leaking former Alameda Research CEO Caroline Ellison\'s diary to the New York Times.',
    //   imageUrl: 'https://www.coindesk.com/resizer/VXHxm71Y6bFG555F5mP982V6whU=/1622x912/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/ANJTXH6OF5AOXJQHI7JBTWL5GY.png',
    //   createdAt: new Date('2023-10-11'),
    // });
    // this.blogsService.addBlog({
    //   id: '',
    //   title: 'Is Friend.tech a Friend or Foe? A Dive Into the New Social App Driving Millions in Trading Volume',
    //   author: 'Cam Thompson',
    //   content: 'The new social app has driven 4,400 ETH ($8.1 million) in trading volume in less than 24 hours since its launch, far surpassing OpenSea\'s in the same time frame. But with its mysterious origins, lack of privacy policy and lagging network, it raises some red flags.',
    //   imageUrl: 'https://www.coindesk.com/resizer/JeOuEH5nS7lDITsg6XZbQT5MpIc=/1056x754/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/5JLQ76U74JGKVOCGRTQXZQNUJY.png',
    //   createdAt: new Date('2023-10-10'),
    // });
    this.store.dispatch(BlogsPageActions.enter());
  }

  openBlog(blogId: string) {
    this.router.navigate(['/blogs', blogId]);
  }

}
