import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;
  firstName: string = '';
  lastName: string = '';
  userId:any='';
  
  private refreshTrigger=new BehaviorSubject<void>(undefined);
  
  constructor(private http: HttpClient) { }
  
  TriggerRefresh()
  {
    this.refreshTrigger.next();
  }

  RefreshOn()
  {
    return this.refreshTrigger.asObservable();
  }

  signup(user: any) {

    return this.http.post<any>('https://localhost:44355/api/app/user', user);
  }

  login(email: string, password: string) {
    const url = `https://localhost:44355/api/app/user/checking-valid-user`;
    const params = { email, password };

    return this.http.post<any>(url, null, { params });
  }

  getRegisteredUsers() {
    return this.http.get<any>('https://localhost:44355/api/app/user');
  }

  deleteRegisteredUser(id: any)
  {
    return this.http.delete(`https://localhost:44355/api/app/user/${id}`)
  }


  clearUser() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.firstName = '';
    this.lastName = '';
    this.userId= '';

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userId');
  }

}
