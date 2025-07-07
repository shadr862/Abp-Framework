import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordered-product-dispaly',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordered-product-dispaly.component.html',
  styleUrl: './ordered-product-dispaly.component.css'
})
export class OrderedProductDispalyComponent implements OnInit {

  products: any[] = [];
  totalPayment: number = 0;

  constructor() {}

  ngOnInit(): void {
    const isExist = history.state.products;

    if (isExist && isExist.length > 0) {
      this.products = isExist;
      this.calculateTotalPayment();
    }
  }

  /** ✅ Calculate total price based on quantity × price */
  calculateTotalPayment(): void {
    this.totalPayment = this.products.reduce((sum, product) => {
      const price = +product.price || 0;
      const quantity = +product.quantity || 0;
      return sum + (price * quantity);
    }, 0);
  }
}



