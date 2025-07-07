import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductCartComponent } from '../product-cart/product-cart.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart-service/cart.service';
import { ReviewService } from '../services/review-service/review.service';
import { ProductService } from '../services/product-service/product.service';
import { AuthService } from '../services/auth-service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detail-product-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCartComponent, HttpClientModule],
  templateUrl: './detail-product-review.component.html',
  styleUrls: ['./detail-product-review.component.css']
})
export class DetailProductReviewComponent implements  OnInit {

  newReview = { reviewerName: '', rating: 5, comment: '', date: '', productId: '' ,userId:''};
  enableReviewForm = false;
  product: any;
  reviews: any[] = [];
  productId: any;
  @Input() searchInput: string = '';
  @ViewChild('cartRef') cartComponent!: ProductCartComponent;


  constructor(
    private route: ActivatedRoute,
    private Service: CartService,
    public router: Router,
    private ReviewService: ReviewService,
    private ProductService: ProductService,
    public AuthService: AuthService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.ReviewService.onRefresh().subscribe(() => {
      this.ReloadReview();
    });

    this.ReloadProduct();
    this.ReloadReview();
  }

  
  //Reload for  refeshing product and review data
  ReloadProduct() {
    this.ProductService.getProductById(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  ReloadReview() {
    this.ReviewService.getRviewsByProductId(this.productId).subscribe(data => {
      this.reviews = data;
    });
  }


  //Product management methods
  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.ProductService.deleteProduct(this.productId)
    }
  }

  editProduct(product: any) {
    this.router.navigate(['/dashboard/products/edit', product.id]);
  }


  //Cart management methods
  addToCart(product: any) {
    this.Service.addToCart(product);
    product.quantity = 1;
  }

  showCart() {
    this.Service.showCart();
    this.cartComponent.updateCartPosition();
  }

  increaseQuantity(product: any) {
    if (product.quantity < product.stock) {
      product.quantity++;
    }
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }


  //Review management methods
  DeleteReview(id:any){
    this.ReviewService.deleteReview(id).subscribe(() => {
      this.ReviewService.triggerRefresh();
    })
  }

  submitReview(): void {
    this.newReview.date = new Date().toISOString();
    this.newReview.productId = this.productId;
    this.newReview.reviewerName = this.AuthService.firstName + ' ' + this.AuthService.lastName;
    this.newReview.userId = this.AuthService.userId;

    this.ReviewService.postReview(this.newReview).subscribe(() => {
      this.newReview = { reviewerName: '', rating: 5, comment: '', date: '', productId: '',userId:'' };
      this.enableReviewForm = false;
      this.ReviewService.triggerRefresh();
      this.ReloadReview();
    });
  }
}

