import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGgpoinsComponent } from './home-ggpoins.component';

describe('HomeGgpoinsComponent', () => {
  let component: HomeGgpoinsComponent;
  let fixture: ComponentFixture<HomeGgpoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGgpoinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGgpoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
