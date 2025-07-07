import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductReviewComponent } from './detail-product-review.component';

describe('DetailProductReviewComponent', () => {
  let component: DetailProductReviewComponent;
  let fixture: ComponentFixture<DetailProductReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProductReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProductReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
