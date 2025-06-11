import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
export class TopNavComponent {
  searchText = '';
  isLoggedIn = false; // Replace with your auth logic
  userAvatarUrl = 'https://i.pravatar.cc/150?img=3'; // Replace with actual user avatar URL

  private router = inject(Router);

  onSearch() {
    if (this.searchText.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchText.trim() } });
    }
  }

  logout() {
    // Your logout logic here
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}

