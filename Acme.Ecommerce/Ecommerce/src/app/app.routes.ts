import { Routes } from '@angular/router';
import { AppNavComponent } from './app-nav/app-nav.component';
import { DetailProductReviewComponent } from './detail-product-review/detail-product-review.component';
import { provideHttpClient } from '@angular/common/http'; // ✅ Import this
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { OrderPlacementComponent } from './order-placement/order-placement.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrderedProductDispalyComponent } from './ordered-product-dispaly/ordered-product-dispaly.component';
import { OrderConfirmedListComponent } from './order-confirmed-list/order-confirmed-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { canActivateAdminGuard } from './guards/can-activate-admin.guard';
import { canActivateGuard } from './guards/can-activate.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: AppNavComponent,
    children: [
      { path: 'products/:id', component: DetailProductReviewComponent},
      {path: 'products', loadChildren: () => import('./products/products.route').then(m => m.productsRoute)},
      {path: 'category', loadChildren: () => import('./category/category.routes').then(m => m.categoryRoutes)},
      {path: 'search',component:SearchProductComponent},
      {path: 'order',component:OrderPlacementComponent,canActivate:[canActivateGuard]},
      {path: 'profile',component:UserProfileComponent,canActivate:[canActivateGuard]},
      {path: 'ordered-product-dispaly', component:OrderedProductDispalyComponent,canActivate:[canActivateGuard]},
      {path: 'orderedList',component:OrderConfirmedListComponent,canActivate:[canActivateAdminGuard]},
      {path: 'user-list' ,component:UserListComponent,canActivate:[canActivateAdminGuard]},
      {path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path:'**', redirectTo: 'dashboard', pathMatch: 'full'}
  
];
