import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureProductsComponent } from './furniture-products.component';

describe('FurnitureProductsComponent', () => {
  let component: FurnitureProductsComponent;
  let fixture: ComponentFixture<FurnitureProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FurnitureProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FurnitureProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
