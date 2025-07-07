import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];
  displayCart: boolean = false; // ✅ Correct spelling

 
  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
    const existing = this.cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cart.push({ ...product, quantity: product.quantity });
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item: any) => item.id !== productId);
  }

  showCart() {
    this.displayCart = true;
  }

  hideCart() {
    this.displayCart = false;
  }
  clearCart() {
    this.cart = [];
  }


}
