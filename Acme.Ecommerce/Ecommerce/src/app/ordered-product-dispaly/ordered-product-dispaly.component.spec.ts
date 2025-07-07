import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedProductDispalyComponent } from './ordered-product-dispaly.component';

describe('OrderedProductDispalyComponent', () => {
  let component: OrderedProductDispalyComponent;
  let fixture: ComponentFixture<OrderedProductDispalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderedProductDispalyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderedProductDispalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
