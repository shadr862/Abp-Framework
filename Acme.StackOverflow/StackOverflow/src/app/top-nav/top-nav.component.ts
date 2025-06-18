import { Component, OnInit } from '@angular/core';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    FormsModule,
    CommonModule
  ],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit{
  searchText = '';
  isLoggedIn = false; // Replace with your auth logic
  userAvatarUrl = 'https://i.pravatar.cc/150?img=3'; // Replace with actual user avatar URL
  userName='';

 constructor(public AuthService:AuthService,
   private RouterService:Router){}

 ngOnInit(): void {
   this.userName = localStorage.getItem('userName') ?? '';
   this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
 }
  onSearch() {
   
  }

  logout() {
    this.AuthService.clear();
    this.RouterService.navigate(['/login']);
  }
}

