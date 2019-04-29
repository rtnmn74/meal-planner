import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meal } from './meal';
import { AFSService } from './afs.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit, OnDestroy {

  meals = [];
  meal = {} as Meal;
  editing = false;
  editingMeal: Meal;
  private subscription;

  constructor(public afsService: AFSService) { }

  ngOnInit() {
    this.subscription = this.afsService.getMeals().subscribe(meals => {
      this.meals = meals;
    });
  }

  addMeal() {
    if (this.meal.name !== '') {
      this.afsService.addMeal(this.meal);
      this.meal = {} as Meal;
    }
  }

  deleteMeal(event, meal) {
    this.afsService.deleteMeal(meal);
  }

  editMeal(event, meal) {
    this.editing = !this.editing;
    this.editingMeal = meal;
  }

  updateMeal() {
    this.afsService.updateMeal(this.editingMeal);
    this.editingMeal = {} as Meal;
    this.editing = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
