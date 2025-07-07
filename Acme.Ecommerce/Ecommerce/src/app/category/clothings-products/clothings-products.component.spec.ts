import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingsProductsComponent } from './clothings-products.component';

describe('ClothingsProductsComponent', () => {
  let component: ClothingsProductsComponent;
  let fixture: ComponentFixture<ClothingsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothingsProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothingsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
