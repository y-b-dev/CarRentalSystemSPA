import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppComponent } from './app.component';
import { CarBackComponent } from './car-back/car-back.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarItemComponent } from './car-list/car-item/car-item.component';
import { CarListComponent } from './car-list/car-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { RentDetailComponent } from './rent-history/rent-detail/rent-detail.component';
import { RentHistoryComponent } from './rent-history/rent-history.component';
import { RentListComponent } from './rent-history/rent-list/rent-list.component';
import { RoutingModule } from './router/router.module';
import { SignupComponent } from './signup/signup.component';
import { CarTypeFormComponent } from './user-panel/manage-car-types/car-type-form/car-type-form.component';
import { ManageCarTypesComponent } from './user-panel/manage-car-types/manage-car-types.component';
import { CListComponent } from './user-panel/manage-cars/c-list/c-list.component';
import { CarFormComponent } from './user-panel/manage-cars/car-form/car-form.component';
import { ManageCarsComponent } from './user-panel/manage-cars/manage-cars.component';
import { ManageRentsComponent } from './user-panel/manage-rents/manage-rents.component';
import { RentFormComponent } from './user-panel/manage-rents/rent-form/rent-form.component';
import { ManageUsersComponent } from './user-panel/manage-users/manage-users.component';
import { UserFormComponent } from './user-panel/manage-users/user-form/user-form.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UListComponent } from './user-panel/manage-users/u-list/u-list.component';
import { CtListComponent } from './user-panel/manage-car-types/ct-list/ct-list.component';
import { RListComponent } from './user-panel/manage-rents/r-list/r-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CarBackComponent,
    RentHistoryComponent,
    NotFoundComponent,
    CarDetailsComponent,
    CarListComponent,
    NavMenuComponent,
    AppFooterComponent,
    UserPanelComponent,
    OrdersComponent,
    OrderComponent,
    RentDetailComponent,
    RentListComponent,
    CarItemComponent,
    ManageCarsComponent,
    ManageCarTypesComponent,
    ManageRentsComponent,
    ManageUsersComponent,
    CListComponent,
    CarFormComponent,
    CarTypeFormComponent,
    RentFormComponent,
    UserFormComponent,
    UListComponent,
    CtListComponent,
    RListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
