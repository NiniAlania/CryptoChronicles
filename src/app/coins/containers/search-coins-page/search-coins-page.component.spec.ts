import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoinsPageComponent } from './search-coins-page.component';

describe('SearchCoinsPageComponent', () => {
  let component: SearchCoinsPageComponent;
  let fixture: ComponentFixture<SearchCoinsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCoinsPageComponent]
    });
    fixture = TestBed.createComponent(SearchCoinsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
