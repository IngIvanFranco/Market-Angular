import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { Error404Component } from './pages/error404/error404.component';
import { ViewcartComponent } from './pages/viewcart/viewcart.component';
import { LoginComponent } from './pages/login/login.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AboutComponent } from './pages/about/about.component';
import { GarantiaComponent } from './pages/garantia/garantia.component';
import { TerminosComponent } from './pages/terminos/terminos.component';
import { TratamientodatosComponent } from './pages/tratamientodatos/tratamientodatos.component';
import { PqrsComponent } from './pages/pqrs/pqrs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { CartGuard } from './guards/cart.guard';
import { CheckGuard } from './guards/check.guard';

const routes: Routes = [

	{path: '', component: HomeComponent },
	{path: 'products/:id', component: ProductsComponent },
	{path: 'product/:id', component: ProductComponent },
	{path: 'search/:q', component: SearchComponent },
  {path: 'viewcart', component: ViewcartComponent,canActivate:[CartGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'my-account', component: MyAccountComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate:[CheckoutGuard,CheckGuard] },
  {path: 'payment/:id', component: PaymentComponent},
  {path: 'about', component: AboutComponent},
  {path: 'garantia', component: GarantiaComponent},
  {path: 'terminos-condiciones', component: TerminosComponent},
  {path: 'tratamiento-datos', component: TratamientodatosComponent},
  {path: 'pqrs', component: PqrsComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[CheckoutGuard]},
  {path: 'order/:id', component: OrderdetailComponent, canActivate:[CheckoutGuard]},
	{path: '**', pathMatch:'full', component: Error404Component }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
