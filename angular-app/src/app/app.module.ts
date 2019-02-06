import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCreationComponent } from './components/product-creation/product-creation.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { FilterPipe } from './filter.pipe';
import { SearchBrandPipe } from './search-brand.pipe';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { SearchUserPipe } from './search-user.pipe';
import { UserListComponent } from './components/user-list/user-list.component';
import { BackpacksCategoryComponent } from './components/backpacks-category/backpacks-category.component';
import { MessengerbagsCategoryComponent } from './components/messengerbags-category/messengerbags-category.component';
import { OtherCategoryComponent } from './components/other-category/other-category.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CarouselHomeComponent } from './components/carousel-home/carousel-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackpackCarouselComponent } from './components/backpack-carousel/backpack-carousel.component';
import { NguCarouselModule } from '@ngu/carousel';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MessengerbagCarouselComponent } from './components/messengerbag-carousel/messengerbag-carousel.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ChartsModule } from 'ng2-charts';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductCreationComponent,
    ProductEditComponent,
    UserRegisterComponent,
    UserLoginComponent,
    FilterPipe,
    UserDashboardComponent,
    NavbarComponent,
    SearchBrandPipe,
    CartComponent,
    ProductInfoComponent,
    CheckoutComponent,
    AdminDashComponent,
    UserEditComponent,
    SearchUserPipe,
    UserListComponent,
    BackpacksCategoryComponent,
    MessengerbagsCategoryComponent,
    OtherCategoryComponent,
    CarouselHomeComponent,
    BackpackCarouselComponent,
    MessengerbagCarouselComponent,
    CheckoutSuccessComponent,
    OrderListComponent,
    DonutChartComponent,
    OrderEditComponent,
    OrderInfoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    HttpModule,
    FormsModule,
    NgFlashMessagesModule,
    StorageServiceModule,
    NgxStripeModule.forRoot('pk_test_FtLxeowhYJL6Zak1LHSGLgSN'),
    ToastrModule.forRoot(),
    ScrollDispatchModule,
    NgbModule,
    NguCarouselModule,
    DragScrollModule

  ],
  providers: [ProductService, ValidateService, AuthService, CartService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
