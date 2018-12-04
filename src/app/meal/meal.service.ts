import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Meal} from './meal';
import {MessageService} from '../messages/message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

// Define variable for setting content type for Http methods
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// Enable class for injector
@Injectable({providedIn: 'root'})

// Class for meal service
export class MealService {

  // Variable for mock api url
  private mealsUrl = 'api/meals';

  // Constructor for meal service
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  // Method to get meals from mock api
  getMeals(): Observable<Meal[]> {
    // Get meals from the data store using Http get
    return this.http.get<Meal[]>(this.mealsUrl)
      .pipe(
        // Catch error for error handler
        catchError(this.handleError('getMeals', []))
      );
  }

  // Method to get meal by id
  getMeal(id: number): Observable<Meal> {
    // Define url from local variable mealsUrl and input id
    const url = `${this.mealsUrl}/${id}`;
    // Add a meal from the data store using Http get by id
    return this.http.get<Meal>(url)
      .pipe(
      // Catch error for error handler
      catchError(this.handleError<Meal>(`getMeal id=${id}`))
    );
  }

  // Method to add a meal
  addMeal(meal: Meal): Observable<Meal> {
    // Add a meal to the data store using Http post
    return this.http.post<Meal>(this.mealsUrl, meal, httpOptions)
      .pipe(
      // Catch error for error handler
      catchError(this.handleError<Meal>('addMeal'))
    );
  }

  // Method to delete a meal
  deleteMeal(meal: Meal | number): Observable<Meal> {
    // Define meal id
    const id = typeof meal === 'number' ? meal : meal.id;
    // Define url from local variable mealsUrl and input id
    const url = `${this.mealsUrl}/${id}`;
    // Delete the meal from the the data store using Http delete
    return this.http.delete<Meal>(url, httpOptions)
      .pipe(
      // Catch error for error handler
      catchError(this.handleError<Meal>('deleteMeal'))
    );
  }

  // Method to update a meal
  updateMeal(meal: Meal): Observable<any> {
  // Put the updated meal changes into the data store using Http put
    return this.http.put(this.mealsUrl, meal, httpOptions)
      .pipe(
      // Catch error error handler
      catchError(this.handleError<any>('updateMeal'))
    );
  }

  // Method for logging errors and continuing to operate on error
  private handleError<mealServiceError>(operation = 'operation', result?: mealServiceError) {
    // Return error to console
    return (error: any): Observable<mealServiceError> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as mealServiceError);
    };
  }

  // Method for logging errors
  private log(message: string) {
    this.messageService.add(`MealService: ${message}`);
  }
}

