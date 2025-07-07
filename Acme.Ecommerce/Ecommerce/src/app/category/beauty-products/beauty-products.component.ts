import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ProductCartComponent } from '../../product-cart/product-cart.component';
import { CartService } from '../../services/cart-service/cart.service';
import { ProductService } from '../../services/product-service/product.service';
import { RouterModule } from '@angular/router';
import { FixedDecriptionLenPipe } from "../../custom-pipe/fixed-decription-len.pipe";

@Component({
  selector: 'app-beauty-products',
  imports: [CommonModule, ProductCartComponent, RouterModule, FixedDecriptionLenPipe],
  templateUrl: './beauty-products.component.html',
  styleUrl: './beauty-products.component.css'
})
export class BeautyProductsComponent {

  productList: any;
  @Input() searchInput = '';
  @ViewChild('cartRef') cartComponent!: ProductCartComponent;

  constructor(private Service: CartService,
    private ProductService: ProductService,
    
  ) { }

  ngOnInit(): void {

    // Subscribe to the refresh trigger from ProductService
    this.ProductService.onRefresh().subscribe(() => {
      this.loadProducts();
    });

    // Initial load of products
    this.loadProducts();
  }

  loadProducts() {
    this.ProductService.getBeautyProducts().subscribe(data => {
      this.productList = data;
    });
  }

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

}
