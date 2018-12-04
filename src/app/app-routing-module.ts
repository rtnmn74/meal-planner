import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MealComponent} from './meal/meal.component';
import {MenuComponent} from './menu/menu.component';
import {MealDetailComponent} from './meal-detail/meal-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  {path : '' , redirectTo: 'MenuComponent', pathMatch: 'full'},
  {path: 'menu', component: MenuComponent},
  {path: 'meal', component: MealComponent},
  {path: 'detail/:id', component: MealDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
