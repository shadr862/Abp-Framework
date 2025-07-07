import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
   
  private refreshTrigger =new BehaviorSubject<void>(undefined)

  constructor(private http:HttpClient) { }
  
  TiggerRefresh()
  {
    this.refreshTrigger.next()
  }

  RefeshOn()
  {
    return this.refreshTrigger.asObservable();
  }
  

  placeOrder(order: any) {
    return this.http.post('https://localhost:44355/api/app/order', order);
  }

  getOrderList()
  {
    return this.http.get('https://localhost:44355/api/app/order');
  }

  getOrderListBYUserId(UserId: string) {
    return this.http.get(`https://localhost:44355/api/app/order/by-user-id/${UserId}`);
    
  }

  editOrder(id:any,order:any)
  {
    return this.http.put(`https://localhost:44355/api/app/order/${id}`,order);
  }

  deleteOder(id:any)
  {
    return this.http.delete(`https://localhost:44355/api/app/order/${id}`);
  }


}
