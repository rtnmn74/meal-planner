import {Component, OnInit} from '@angular/core';
import {Meal} from './meal';
import {MealService} from './meal.service';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  // Define meals variable with array
  meals: Meal[];

  constructor(private mealService: MealService) {
  }

  ngOnInit() {
    this.getMeals();
  }

  // Method to get meals using meal service
  getMeals(): void {
    this.mealService.getMeals()
      .subscribe(meals => this.meals = meals);
  }

  // Method to add a meal using meal service
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.mealService.addMeal({name} as Meal)
      .subscribe(meal => {
        this.meals.push(meal);
      });
  }

  // Method to delete a meal using meal service
  delete(meal: Meal): void {
    this.meals = this.meals.filter(h => h !== meal);
    this.mealService.deleteMeal(meal).subscribe();
  }

}
