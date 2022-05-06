import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { HeaderPromotionComponent } from './modules/header-promotion/header-promotion.component';
import { HeaderMobileComponent } from './modules/header-mobile/header-mobile.component';
import { NewletterComponent } from './modules/newletter/newletter.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { HomeFeaturesComponent } from './pages/home/home-features/home-features.component';
import { HomePromotionsComponent } from './pages/home/home-promotions/home-promotions.component';

import { HomeTopCategoriesComponent } from './pages/home/home-top-categories/home-top-categories.component';
import { HomeShowcaseComponent } from './pages/home/home-showcase/home-showcase.component';
import { ViewcartComponent } from './pages/viewcart/viewcart.component';
import { LoginComponent } from './pages/login/login.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
import { GarantiaComponent } from './pages/garantia/garantia.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { TratamientodatosComponent } from './pages/tratamientodatos/tratamientodatos.component';
import { PqrsComponent } from './pages/pqrs/pqrs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { RespassComponent } from './pages/respass/respass.component';
import { ProductssubComponent } from './pages/productssub/productssub.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderPromotionComponent,
    HeaderMobileComponent,
    NewletterComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    SearchComponent,
    Error404Component,
    HomeBannerComponent,
    HomeFeaturesComponent,
    HomePromotionsComponent,

    HomeTopCategoriesComponent,
    HomeShowcaseComponent,
    ViewcartComponent,
    LoginComponent,
    MyAccountComponent,
    RegisterComponent,
    CheckoutComponent,
    PaymentComponent,
    AboutComponent,
    GarantiaComponent,
    TerminosComponent,
    TratamientodatosComponent,
    PqrsComponent,
    ProfileComponent,
    OrderdetailComponent,
    EditprofileComponent,
    RespassComponent,
    ProductssubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
       HttpClientModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
