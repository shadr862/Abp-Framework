import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../services/search-service/search.service';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { CartService } from '../services/cart-service/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FixedDecriptionLenPipe } from "../custom-pipe/fixed-decription-len.pipe";

@Component({
  selector: 'app-search-product',
  imports: [CommonModule, RouterModule, FixedDecriptionLenPipe, ProductCartComponent],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent  implements OnInit{

  searchTerm!:string
  searchResults: any;
  @ViewChild('cartRef') cartComponent!: ProductCartComponent;

  constructor(private SearchService:SearchService,
    private Service: CartService){}

  ngOnInit(): void {
    
    this.SearchService.search$.subscribe((val)=>{
        this.searchTerm=val;
        
        this.SearchService.searchProducts(this.searchTerm).subscribe(results => {
        this.searchResults = results;
      });
    })
    
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
