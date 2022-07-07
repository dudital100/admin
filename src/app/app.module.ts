import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { ChefsComponent } from './components/chefs/chefs.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/general/header/header.component';
import { AsideComponent } from './components/general/aside/aside.component';
import { AddDishFormComponent } from './components/dishes/add-dish-form/add-dish-form.component';
import { UpdateDishFormComponent } from './components/dishes/update-dish-form/update-dish-form.component';
import { UpdateChefFormComponent } from './components/chefs/update-chef-form/update-chef-form.component';
import { AddChefFormComponent } from './components/chefs/add-chef-form/add-chef-form.component';
import { AddRestaurantFormComponent } from './components/restaurants/add-restaurant-form/add-restaurant-form.component';
import { UpdateRestaurantFormComponent } from './components/restaurants/update-restaurant-form/update-restaurant-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { AuthGuard } from './services/auth-guard.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TokenService } from './services/token.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HotToastModule } from '@ngneat/hot-toast';
import { MonthlyChefComponent } from './components/monthly-chef/monthly-chef.component';
import { UpdateMonthlyChefComponent } from './components/monthly-chef/update-monthly-chef/update-monthly-chef.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RestaurantsComponent,
    DishesComponent,
    ChefsComponent,
    LandingPageComponent,
    HeaderComponent,
    AsideComponent,
    AddRestaurantFormComponent,
    UpdateRestaurantFormComponent,
    AddDishFormComponent,
    UpdateDishFormComponent,
    UpdateChefFormComponent,
    AddChefFormComponent,
    MonthlyChefComponent,
    UpdateMonthlyChefComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    HotToastModule.forRoot(),
  ],
  exports: [
  ],
  providers: [AuthGuard,TokenService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
