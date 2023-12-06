import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './components/auth/_helpers/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
// import { AdminComponent } from './components/admin/admin.component';
import { AuthComponent } from './components/auth/auth.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { SearchNameComponent } from './components/search-name/search-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { PopupCartComponent } from './components/cart/popup-cart/popup-cart.component';
import { FinishedComponent } from './components/checkout/finished/finished.component';
import { AddressPopupComponent } from './components/checkout/address-popup/address-popup.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AddBookComponent } from './components/admin/add-book/add-book.component';
import { EditBookComponent } from './components/admin/edit-book/edit-book.component';
import { HomeBookComponent } from './components/admin/home-book/home-book.component';
import { LineChartComponent } from './components/admin/line-chart/line-chart.component';
import { StatisticComponent } from './components/admin/statistic/statistic.component';
export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PostComponent,
    AuthComponent,
    BookDetailComponent,
    CartComponent,
    CategoryComponent,
    CheckoutComponent,
    ContactComponent,
    SearchNameComponent,
    PopupCartComponent,
    FinishedComponent,
    AddressPopupComponent,
    HomeAdminComponent,
    SidebarComponent,
    AddBookComponent,
    EditBookComponent,
    HomeBookComponent,
    LineChartComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgChartsModule,
    ToastrModule.forRoot({
      toastClass: "ngx-toastr",
      titleClass: "toast-title",
      messageClass: "toast-message",
      positionClass: "toast-bottom-right",

    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
