import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragrancesProductsComponent } from './fragrances-products.component';

describe('FragrancesProductsComponent', () => {
  let component: FragrancesProductsComponent;
  let fixture: ComponentFixture<FragrancesProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FragrancesProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragrancesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
