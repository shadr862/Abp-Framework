import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order-service/order.service';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterOrdersPipe } from "../custom-pipe/filter-orders.pipe";


@Component({
  selector: 'app-order-confirmed-list',
  imports: [CommonModule, FormsModule, FilterOrdersPipe],
  templateUrl: './order-confirmed-list.component.html',
  styleUrl: './order-confirmed-list.component.css'
})
export class OrderConfirmedListComponent {

  orderedList: any;
  searchText: string = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderService.RefeshOn().subscribe(() => {
      this.LoadData();
    })

    this.LoadData();

  }

  LoadData() {
    this.orderService.getOrderList().subscribe((data: any) => {
      this.orderedList = data;
    });
  }

  viewProductList(productList: any) {
    this.router.navigate(['/dashboard/ordered-product-dispaly'], { state: { products: productList } });
  }
  Delivered(order: any) {

    const model = {
      name: order.name,
      phoneNumber: order.phoneNumber,
      status: "Paid",
      deliveryMethod: order.deliveryMethod,
      userId: order.userId,
      address: {
        country: order.address.country,
        division: order.address.division,
        city: order.address.city,
        street: order.address.street,
      },
      orderedProducts: order.orderedProducts.map((p: any) => ({
        title: p.title,
        category: p.category,
        price: p.price,
        quantity: p.quantity,
        thumbnail: p.thumbnail,
        productId: p.productId
      }))
    };


    this.orderService.editOrder(order.id,model).subscribe(() => {
      this.orderService.TiggerRefresh();
    })
  }

  deleteOrder(id: any) {
    this.orderService.deleteOder(id).subscribe(() => {
      this.orderService.TiggerRefresh();
    })
  }
}
