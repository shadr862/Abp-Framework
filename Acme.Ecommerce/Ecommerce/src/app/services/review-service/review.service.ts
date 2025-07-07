import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private refreshTrigger = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) { }

  triggerRefresh() {
    this.refreshTrigger.next();
  }

  onRefresh(): Observable<void> {
    return this.refreshTrigger.asObservable();
  }

  getRviewsByProductId(productId: any) {
    return this.http.get<any>(`https://localhost:44355/api/app/product-review/reviews-by-product-id/${productId}`);
  }
  postReview(review: any) {
    return this.http.post<any>('https://localhost:44355/api/app/review', review);
  }

  deleteReview(reviewId: any) {
    return this.http.delete(`https://localhost:44355/api/app/review/${reviewId}`);
  }
}
