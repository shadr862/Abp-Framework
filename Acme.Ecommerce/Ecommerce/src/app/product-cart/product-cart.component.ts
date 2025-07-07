import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CartService } from '../services/cart-service/cart.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { ProductService } from '../services/product-service/product.service';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  cart: any[] = [];
  @ViewChild('cartDiv') cartElement!: ElementRef;

  constructor(private cartService: CartService, 
    public route: Router,
    private ProductService:ProductService,
    public AuthService:AuthService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  /*
  if-> @ViewChild('cart') cartElement!: ElementRef;
  deafult:{ static: false }
  */
  ngAfterViewInit() {
    // Initially hide cart
    this.cartElement.nativeElement.style.right = this.cartService.displayCart ? '0px' : '-400px';
  }


  toggleCart() {
    if (this.cartService.displayCart) {
      this.cartElement.nativeElement.style.right = '-400px';
      this.cartService.hideCart();
    } else {
      this.cartElement.nativeElement.style.right = '0px';
      this.cartService.showCart();
    }
  }
  updateCartPosition() {
    const visible = this.cartService.displayCart;
    this.cartElement.nativeElement.style.right = visible ? '0px' : '-400px';
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCart();
  }

  getTotalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout() {
    this.toggleCart();
    this.route.navigate(['/dashboard/order']);
  } 
}
