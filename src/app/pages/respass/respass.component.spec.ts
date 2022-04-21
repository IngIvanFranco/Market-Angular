import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespassComponent } from './respass.component';

describe('RespassComponent', () => {
  let component: RespassComponent;
  let fixture: ComponentFixture<RespassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
