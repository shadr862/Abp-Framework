import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  constructor(private http: HttpClient) { }

  setSearch(value: string) {
    this.searchSubject.next(value);
  }

  searchProducts(term: string) {
    return this.http.get<any>(`https://localhost:44355/api/app/product-review/search-item?Searchterm=${term}`);
  }


}
