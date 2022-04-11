import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopCategoriesComponent } from './home-top-categories.component';

describe('HomeTopCategoriesComponent', () => {
  let component: HomeTopCategoriesComponent;
  let fixture: ComponentFixture<HomeTopCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTopCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTopCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
