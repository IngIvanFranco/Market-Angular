import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductssubComponent } from './productssub.component';

describe('ProductssubComponent', () => {
  let component: ProductssubComponent;
  let fixture: ComponentFixture<ProductssubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductssubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductssubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
