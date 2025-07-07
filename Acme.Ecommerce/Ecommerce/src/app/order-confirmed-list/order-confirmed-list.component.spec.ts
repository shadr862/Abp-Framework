import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmedListComponent } from './order-confirmed-list.component';

describe('OrderConfirmedListComponent', () => {
  let component: OrderConfirmedListComponent;
  let fixture: ComponentFixture<OrderConfirmedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
