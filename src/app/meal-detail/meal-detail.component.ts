import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MealService} from '../meal/meal.service';
import {Meal} from '../meal/meal';


@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})

// Class for meal detail
export class MealDetailComponent implements OnInit {

  // Enable input for meal
  @Input() meal: Meal;

  // Constructor for meal detail component
  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location
  ) {
  }

  // On initialize get meal
  ngOnInit() {
    this.getMeal();
  }

  // Method to get meal by id
  getMeal(): void {
    // Define variable for id from the route snapshot
    const id = +this.route.snapshot.paramMap.get('id');
    // Subscribe to meal service get meal method
    this.mealService.getMeal(id)
      .subscribe(meal => this.meal = meal);
  }

  // Method to go back to previous screen
  goBack(): void {
    // Use back method in location to go back to previous screen
    this.location.back();
  }

  // Method to save the change to the meal
  save(): void {
    // Subscribe to meal service update meal method
    this.mealService.updateMeal(this.meal)
      .subscribe(() => this.goBack());
  }
}
