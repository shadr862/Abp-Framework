import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports:[CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "EmailId": "",
    "Password": ""
  }

  showPassword: boolean = false;

  router = inject(Router);

  constructor( ) {

  }

  login() {
      
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}