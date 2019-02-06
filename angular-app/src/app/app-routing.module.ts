import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductCreationComponent } from './components/product-creation/product-creation.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { BackpacksCategoryComponent } from './components/backpacks-category/backpacks-category.component';
import { MessengerbagsCategoryComponent } from './components/messengerbags-category/messengerbags-category.component';
import { OtherCategoryComponent } from './components/other-category/other-category.component';
import { BackpackCarouselComponent } from './components/backpack-carousel/backpack-carousel.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';


const routes: Routes = [
  { path: "", pathMatch:"full", redirectTo: "home" },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: UserRegisterComponent},
  { path: 'dashboard', component: UserDashboardComponent},
  { path: 'login', component: UserLoginComponent},
  
  { path: 'create', component: ProductCreationComponent, canActivate:[AuthGuard]},
  { path: 'products', component: ProductListComponent },
  { path: 'edit/:id', component:ProductEditComponent, canActivate:[AuthGuard] },
  { path: 'product/:id', component: ProductInfoComponent },
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'admin-dash', component: AdminDashComponent, canActivate:[AuthGuard]},
  { path: 'edit-user/:id', component: UserEditComponent},
  { path: 'backpacks', component: BackpacksCategoryComponent},
  { path: 'messengerbags', component: MessengerbagsCategoryComponent},
  { path: 'other', component: OtherCategoryComponent},
  { path: 'drag', component: BackpackCarouselComponent},
  { path: 'checkout/success', component: CheckoutSuccessComponent},
  { path: 'orders', component: OrderListComponent, canActivate:[AuthGuard]},
  { path: 'orders/edit/:id', component: OrderEditComponent, canActivate:[AuthGuard]},
  { path: 'orders/view/:id', component: OrderInfoComponent, canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
