import { BeautyProductsComponent } from "./beauty-products/beauty-products.component";
import { ClothingsProductsComponent } from "./clothings-products/clothings-products.component";
import { ElectronicsAndJewelryComponent } from "./electronics-and-jewelry/electronics-and-jewelry.component";
import { FragrancesProductsComponent } from "./fragrances-products/fragrances-products.component";
import { GroceriesProductsComponent } from "./groceries-products/groceries-products.component";
import { FurnitureProductsComponent } from "./furniture-products/furniture-products.component";

export const categoryRoutes = [
  { path: 'beauty-products', component: BeautyProductsComponent },
  { path: 'clothings-products', component: ClothingsProductsComponent },
  { path: 'electronics-and-jewelry-products', component: ElectronicsAndJewelryComponent },
  { path: 'fragrances-products', component: FragrancesProductsComponent },
  { path: 'groceries-products', component: GroceriesProductsComponent },
  { path: 'furniture-products', component: FurnitureProductsComponent }
];
