import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private refreshTrigger = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) { }

  triggerRefresh() {
    this.refreshTrigger.next();
  }

  onRefresh(): Observable<void> {
    return this.refreshTrigger.asObservable();
  }



  getProducts() {
    return this.http.get<any>('https://localhost:44355/api/app/product');
  }

  getProductById(id: any) {
    return this.http.get<any>(`https://localhost:44355/api/app/product/${id}`);
  }

  UpdateProduct(product: any) {
    return this.http.put<any>(`https://localhost:44355/api/app/product/${product.id}`, product);
  }
  deleteProduct(id:any)
  {
    return this.http.delete(`https://localhost:44355/api/app/product/${id}`)
  }

  //Catagory Products

  getBeautyProducts() {
    return this.http.get<any>('https://localhost:44355/api/app/product/beauty-product');
  }
  getClothingProducts() {
    return this.http.get<any>('https://localhost:44355/api/app/product/clothing-product');
  }
  getElectronicAndJeweleryProducts() {
    return this.http.get<any>('https://localhost:44355/api/app/product/electronics-and-jewelery-product');
  }
  getFurnitureProducts() {
    return this.http.get<any>('https://localhost:44355/api/app/product/furniture-product');
  }
  getFragrancesProducts() {
    return this.http.get<any>('https://localhost:44355/api/app/product/fragrances-product');
  }
  getGroceriesProducts() {
    return this.http.get<any>('https://localhost:44355/api/app/product/groceries-product');
  }
}
