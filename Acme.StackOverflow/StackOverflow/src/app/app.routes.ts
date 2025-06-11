import { Routes } from '@angular/router';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


export const routes: Routes = [
  {
    path: 'dashboard',
    component: TopNavComponent,
    children: [
       
    ]
  },
  // Optional fallback route:
  { path: 'login', component:LoginComponent},
  { path: 'signup',component:SignupComponent},
  { path: '', redirectTo: 'dashboard',pathMatch:'full'},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

