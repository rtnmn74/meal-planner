import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Meal } from './meal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AFSService {

  mealsCollection: AngularFirestoreCollection<Meal>;
  meals: Observable<Meal[]>;
  mealDoc: AngularFirestoreDocument<Meal>;

  constructor(public db: AngularFirestore) {
       this.mealsCollection = this.db.collection('meals');
    this.meals = this.mealsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Meal;
        data.id = a.payload.doc.id;
         return data;
      });
    }));
  }

  getMeals() {
    return this.meals;
  }

  addMeal(meal: Meal) {
    this.mealsCollection.add(meal);
  }

  deleteMeal(meal: Meal) {
    this.mealDoc = this.db.doc(`meals/${meal.id}`);
    this.mealDoc.delete();
  }

  updateMeal(meal: Meal) {
    this.mealDoc = this.db.doc(`meals/${meal.id}`);
    this.mealDoc.update(meal);
  }

}
