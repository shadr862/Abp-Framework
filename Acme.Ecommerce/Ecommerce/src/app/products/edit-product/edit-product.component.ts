import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  product: any;
 
  productForm!: FormGroup;

  constructor(private router: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private route:Router) { }

  ngOnInit(): void {
    // Initialize the form with empty/default values first
    this.productForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      thumbnail: [{ value: '', disabled: true }],  // disable thumbnail input if needed
    });

    // Fetch product data asynchronously
    const productId = this.router.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;

      // Now patch the form with product data
      this.loadProductData();
    });
  }

  loadProductData() {
    this.productForm.patchValue({
      id: this.product.id,
      title: this.product.title,
      description: this.product.description,
      category: this.product.category,
      price: this.product.price,
      stock: this.product.stock,
      quantity: this.product.quantity,
      thumbnail: this.product.thumbnail
    });
  }


  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.getRawValue();
      this.productService.UpdateProduct(updatedProduct).subscribe(()=>{
        this.productService.triggerRefresh(); // Notify other components to refresh
        this.route.navigate(['/dashboard/products',this.product.id]); 
      })

    }
  }

}
