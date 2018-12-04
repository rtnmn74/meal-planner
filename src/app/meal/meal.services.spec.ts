import {Meal} from './meal';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {MealService} from './meal.service';
import {MessageService} from '../messages/message.service';


const mockData = [
  {id: 1, name: 'Taco'},
  {id: 2, name: 'Pizza'},
  {id: 3, name: 'Chili'}
] as Meal[];

describe('MealService', () => {

  let service;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MealService, MessageService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([MealService], s => {
    service = s;
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('getMeals', () => {

    it('should return mock meals', () => {
      const mockMeals = [...mockData];

      service.getMeals().subscribe(
        meals => expect(meals.length).toEqual(mockMeals.length),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(service.mealsUrl);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock meals
      req.flush(mockMeals);
    });
  });

  describe('updateMeal', () => {

    it('should update meal', () => {

      const mockMeals = [...mockData];
      const mockMeal = mockMeals[0];

      service.updateMeal(mockMeal).subscribe(
        response => expect(response).toEqual(mockMeal),
        fail
      );
      // Receive PUT request
      const req = httpTestingController.expectOne(service.mealsUrl);
      expect(req.request.method).toEqual('PUT');
      // Respond with the updated meal
      req.flush(mockMeal);
    });
  });

  describe('deleteMeal', () => {

    it('should delete meal using id', () => {
      const mockMeals = [...mockData];
      const mockMeal = mockMeals[0];
      const mockId = mockMeal.id;
      const apiUrl = (id: number) => {
        return `detail/${mockId}`;
        const mockUrl = apiUrl(mockId);

        service.deleteMeal(mockId).subscribe(
          response => expect(response).toEqual(mockId),
          fail
        );
        // Receive DELETE request
        const req = httpTestingController.expectOne(mockUrl);
        expect(req.request.method).toEqual('DELETE');
        // Respond with the updated meal
        req.flush(mockId);
      };
    });

    it('should delete meal using meal object', () => {
      const mockMeals = [...mockData];
      const mockMeal = mockMeals[0];
      const mockId = mockMeal.id;
      const apiUrl = (id: number) => {
        return `api/meals/${mockId}`;
      };
        const mockUrl = apiUrl(mockId);
        service.deleteMeal(mockMeal).subscribe(
          response => expect(response).toEqual(mockMeal.id),
          fail
        );
        // Receive DELETE request
        const req = httpTestingController.expectOne(mockUrl);
        expect(req.request.method).toEqual('DELETE');
        // Respond with the updated meal
        req.flush(mockMeal.id);
      });
    });
  });

