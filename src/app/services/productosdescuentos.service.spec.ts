import { TestBed } from '@angular/core/testing';

import { ProductosdescuentosService } from './productosdescuentos.service';

describe('ProductosdescuentosService', () => {
  let service: ProductosdescuentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosdescuentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
