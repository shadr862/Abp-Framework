import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { error } from 'node:console';
import { response } from 'express';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private AuthService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.AuthService.login(email, password).subscribe((response) => {


        if (response!=null && response.email === email && response.password === password) {
          this.AuthService.isLoggedIn = true;
          this.AuthService.isAdmin = response.firstName === 'Riaz';
          this.AuthService.firstName = response.firstName;
          this.AuthService.lastName = response.lastName;
          this.AuthService.userId = response.id;

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('isAdmin', this.AuthService.isAdmin.toString());
          localStorage.setItem('firstName', this.AuthService.firstName);
          localStorage.setItem('lastName', this.AuthService.lastName);
          localStorage.setItem('userId', this.AuthService.userId.toString());

          this.loginForm.markAsPristine();
          this.router.navigate(['/dashboard']);
        }
        else{
          this.message='Wrong Credential'
        }

      });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
