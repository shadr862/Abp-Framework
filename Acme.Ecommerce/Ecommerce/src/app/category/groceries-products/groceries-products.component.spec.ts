import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceriesProductsComponent } from './groceries-products.component';

describe('GroceriesProductsComponent', () => {
  let component: GroceriesProductsComponent;
  let fixture: ComponentFixture<GroceriesProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceriesProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceriesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
