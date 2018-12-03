import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarBackComponent } from '../car-back/car-back.component';
import { CarDetailsComponent } from '../car-details/car-details.component';
import { CarListComponent } from '../car-list/car-list.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { OrdersComponent } from '../orders/orders.component';
import { RentHistoryComponent } from '../rent-history/rent-history.component';
import { CanDeactivateGuard } from '../services/guards/can-deactivate.guard';
import { EmployeeAuthGuard } from '../services/guards/employee-auth.guard';
import { ManagerAuthGuard } from '../services/guards/manager-auth.guard';
import { UserAuthGuard } from '../services/guards/user-auth.guard';
import { SignupComponent } from '../signup/signup.component';
import { CarTypeFormComponent } from '../user-panel/manage-car-types/car-type-form/car-type-form.component';
import { ManageCarTypesComponent } from '../user-panel/manage-car-types/manage-car-types.component';
import { CarFormComponent } from '../user-panel/manage-cars/car-form/car-form.component';
import { ManageCarsComponent } from '../user-panel/manage-cars/manage-cars.component';
import { ManageRentsComponent } from '../user-panel/manage-rents/manage-rents.component';
import { RentFormComponent } from '../user-panel/manage-rents/rent-form/rent-form.component';
import { ManageUsersComponent } from '../user-panel/manage-users/manage-users.component';
import { UserFormComponent } from '../user-panel/manage-users/user-form/user-form.component';
import { UserPanelComponent } from '../user-panel/user-panel.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cars', component: CarListComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  {
    path: 'user-panel', component: UserPanelComponent, canActivate: [UserAuthGuard], children: [
      { path: 'car-back', component: CarBackComponent, canActivate: [EmployeeAuthGuard] },
      { path: 'rent-history', component: RentHistoryComponent },
      { path: 'manage-cars', component: ManageCarsComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-cars/add', component: CarFormComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-cars/edit/:id', component: CarFormComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-users', component: ManageUsersComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-users/add', component: UserFormComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-users/edit/:id', component: UserFormComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-car-types', component: ManageCarTypesComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-car-types/add', component: CarTypeFormComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-car-types/edit/:id', component: CarTypeFormComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-rents', component: ManageRentsComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-rents/add', component: RentFormComponent, canActivate: [ManagerAuthGuard] },
      { path: 'manage-rents/edit/:id', component: RentFormComponent, canActivate: [ManagerAuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent, canDeactivate: [CanDeactivateGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
