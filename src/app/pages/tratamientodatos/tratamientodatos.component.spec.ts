import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientodatosComponent } from './tratamientodatos.component';

describe('TratamientodatosComponent', () => {
  let component: TratamientodatosComponent;
  let fixture: ComponentFixture<TratamientodatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientodatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientodatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
