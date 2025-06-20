import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLisLoggedIn: boolean = false;
  userId:string='';
  userName:string='';

  constructor(private http:HttpClient) { }

  SignUp(User:any)
  {
    return this.http.post<any>('https://localhost:44341/api/app/app-user',User)
  }

  Login(email:string,password:string)
  {
    const url = `https://localhost:44341/api/app/app-user/check-user`;
    const params = { email, password };

    return this.http.post<any>(url, null, { params });

  }

  clear()
  {
    this.isLisLoggedIn=false;
    this.userId='';
    this.userName='';

    localStorage.removeItem('isLisLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userName');
  }
}
