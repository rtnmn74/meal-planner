import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

// Mock API service for using with an actual data source.
// Data in browser is not persistent using in-memory data
// Mocked meal data is staged here for prototyping

// Enable inject for in memory service
@Injectable({
  providedIn: 'root',
})
// Class for in memory service
export class InMemoryDataService implements InMemoryDbService {
  // Method to create mock database
  createDb() {
    // Define mock Array
    const meals = [
      { id: 1, name: 'None' },
      { id: 2, name: 'Toast' },
      { id: 3, name: 'Cereal'},
      { id: 4, name: 'Tacos'},
      { id: 5, name: 'Sandwich'},
      { id: 6, name: 'Spaghetti'},
      { id: 7, name: 'Salad'},
      { id: 8, name: 'Chili'},
      { id: 9, name: 'Steak '},
      { id: 10, name: 'Sloppy Joe'},
      { id: 11, name: 'Pizza'}
    ];
    // Return array
    return {meals};
  }
}
