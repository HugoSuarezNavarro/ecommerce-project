import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DynamicCurrencyPipe } from './pipes/dynamic-currency.pipe';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeDe from '@angular/common/locales/de';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const routes: Routes = [
  {path: 'cart', component: CartDetailsComponent},
  {path: 'products/category/:id/search', component: ProductListComponent},
  {path: 'products/category/:id', component: ProductListComponent},
  {path: 'products/category', component: ProductListComponent},
  {path: 'products/search', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo:'/products', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
]

registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryListComponent,
    SearchBarComponent,
    ProductDetailsComponent,
    PageNotFoundComponent,
    DynamicCurrencyPipe,
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    ProductService,
    CurrencyPipe,
    {provide: LOCALE_ID, useValue: 'es'},
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
