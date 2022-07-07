import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from '../app/components/restaurants/restaurants.component';
import { LoginComponent } from '../app/auth/login/login.component';
import { DishesComponent } from '../app/components/dishes/dishes.component';
import { ChefsComponent } from '../app/components/chefs/chefs.component';
import { AuthCheckService } from './services/auth-check.service';
import { AuthGuard } from './services/auth-guard.service';
import { MonthlyChefComponent } from './components/monthly-chef/monthly-chef.component';


const auth = new AuthCheckService;
let isLogged = auth.isLoggedIn();

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'restaurants', component: RestaurantsComponent, canActivate: [AuthGuard]},
  { path: 'dishes', component: DishesComponent, canActivate: [AuthGuard] },
  { path: 'chefs', component: ChefsComponent, canActivate: [AuthGuard] },
  { path: 'chefs-of-the-month', component: MonthlyChefComponent, canActivate: [AuthGuard] },
  { path: '',redirectTo: isLogged ? '/restaurants' :'/login' , pathMatch: "full" },
  // { path: '**', redirectTo: '/admin' , pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
