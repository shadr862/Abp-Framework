import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../services/cart-service/cart.service';
import { AuthService } from '../services/auth-service/auth.service';
import { OrderService } from '../services/order-service/order.service';
import { ProductService } from '../services/product-service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-placement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-placement.component.html',
  styleUrl: './order-placement.component.css'
})
export class OrderPlacementComponent {
  userOrderForm!: FormGroup;
  products: any[] = [];
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private CartService: CartService,
    private AuthService: AuthService,
    private orderService: OrderService,
    private ProductService: ProductService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.userOrderForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      status:['',Validators.required],
      deliveryMethod:[{ value: '', disabled: true },Validators.required],
      userId: [{ value: '', disabled: true }, Validators.required],
      address: this.fb.group({
        country: ['', Validators.required],
        division: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
      }),
      orderedProducts: this.fb.array([this.createOrderedProduct()])
    });

    this.products = this.CartService.getCart();
    this.userId = this.AuthService.userId;
    this.populateForm();
  }

  populateForm() {
    this.userOrderForm.patchValue({
      userId: this.userId,
      status:'Progress',
      deliveryMethod:'Cash On Delivery',
    });

    // Clear current orderedProducts FormArray
    this.orderedProducts.clear();

    // Add each product as a FormGroup to the FormArray
    this.products.forEach(product => {
      this.orderedProducts.push(this.fb.group({
        title: [product.title, Validators.required],
        category: [product.category, Validators.required],
        price: [product.price, [Validators.required, Validators.min(0)]],
        quantity: [product.quantity, [Validators.required, Validators.min(1)]],
        thumbnail: [product.thumbnail, Validators.required],
        productId: [product.id, Validators.required],
      }));
    });
  }

  createOrderedProduct(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      thumbnail: ['', Validators.required],
      productId: ['', Validators.required],
    });
  }

  get orderedProducts(): FormArray {
    return this.userOrderForm.get('orderedProducts') as FormArray;
  }

  /** 💡 Total Payment Calculation */
  get totalPayment(): number {
    return this.orderedProducts.controls.reduce((total, productGroup) => {
      const price = +productGroup.get('price')?.value || 0;
      const quantity = +productGroup.get('quantity')?.value || 0;
      return total + (price * quantity);
    }, 0);
  }

  addOrderedProduct(): void {
    this.orderedProducts.push(this.createOrderedProduct());
  }

  removeOrderedProduct(index: number): void {
    this.orderedProducts.removeAt(index);
  }

  onSubmit(): void {
    if (this.userOrderForm.valid) {
      this.orderService.placeOrder(this.userOrderForm.getRawValue()).subscribe(() => {
        for (const item of this.products) {
          item.stock = item.stock - item.quantity;
          item.quantity = 1;
          this.ProductService.UpdateProduct(item).subscribe();
        }

        this.ProductService.triggerRefresh();
        this.CartService.clearCart(); // Clear the cart after placing the order
        this.userOrderForm.reset(); // Reset the form
        this.orderedProducts.clear(); // Clear the ordered products array
        this.userOrderForm.markAllAsTouched();
        this.Router.navigateByUrl('/dashboard/profile');
      });
    }
  }
}
