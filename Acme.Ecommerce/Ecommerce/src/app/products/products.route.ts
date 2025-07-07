import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { canActivateAdminGuard } from '../guards/can-activate-admin.guard';


export const productsRoute: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'edit/:id', component: EditProductComponent,canActivate:[canActivateAdminGuard] }
];
