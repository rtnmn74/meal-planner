import {inject, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing-module';
import {FormsModule} from '@angular/forms';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {MealComponent} from './meal.component';
import {MealDetailComponent} from '../meal-detail/meal-detail.component';
import {MenuComponent} from '../menu/menu.component';
import {APP_BASE_HREF} from '@angular/common';
import {MealService} from './meal.service';
import {Meal} from './meal';
import {BrowserModule} from '@angular/platform-browser';
import {of} from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MessageService} from '../messages/message.service';


describe('MealService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [MealComponent, MealDetailComponent, MenuComponent],
    imports: [AppRoutingModule, FormsModule, SelectDropDownModule, HttpClientModule, BrowserModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}]
  }));

  // Test to verify meal service component gets created
  it('should be created', () => {
    const service: MealService = TestBed.get(MealService);
    expect(service).toBeTruthy();
  });

  // Define Test Variables
  let httpClientSpy: { get: jasmine.Spy };
  let mealService: MealService;

  // Run before all proceeding tests
  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    mealService = new MealService(<any>httpClientSpy, null);
  });

  // Test to return meals from data store from call method
  it('should return expected meals (HttpClient called once)', () => {
    // Define mock meal data
    const expectedMeals = [
      {id: 1, name: 'Taco'},
      {id: 2, name: 'Pizza'},
      {id: 3, name: 'Chili'}
    ] as Meal[];
    // Use spy Http client get return meals
    httpClientSpy.get.and.returnValue(of(expectedMeals));
    mealService.getMeals().subscribe(
      meals => expect(meals).toEqual(expectedMeals, 'expected meals'),
      fail
    );
    // Assert meal method was called one time
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
  // Define mock meal data
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
      // Test returning meals
      it('should return mock meals', () => {
        // Define mock meal variables
        const mockMeals = [...mockData];

        service.getMeals().subscribe(
          meals => expect(meals.length).toEqual(mockMeals.length),
          fail
        );
        // Test getMeals HTTP get
        const req = httpTestingController.expectOne(service.mealsUrl);

        // Assert GET request
        expect(req.request.method).toEqual('GET');
        // Respond with the mock meals
        req.flush(mockMeals);
      });
    });

    describe('updateMeal', () => {

      it('should update meal', () => {
        // Define mock meal variables
        const mockMeals = [...mockData];
        const mockMeal = mockMeals[0];

        service.updateMeal(mockMeal).subscribe(
          response => expect(response).toEqual(mockMeal),
          fail
        );
        // Test updateMeals HTTPClient put
        const req = httpTestingController.expectOne(service.mealsUrl);

        // Assert PUT request
        expect(req.request.method).toEqual('PUT');
        // Respond with an updated meal
        req.flush(mockMeal);
      });
    });

    describe('deleteMeal', () => {

      // Test delete meal object by id
      it('should delete meal using id', () => {
        // Define mock meal variables
        const mockMeals = [...mockData];
        const mockMeal = mockMeals[0];
        const mockId = mockMeal.id;
        const apiUrl = (id: number) => {
          return `${service.mealsUrl}/${mockId}`;
          const mockUrl = apiUrl(mockId);

          // Test deleteMeal HTTPClient delete
          service.deleteMeal(mockId).subscribe(
            response => expect(response).toEqual(mockId),
            fail
          );

          const req = httpTestingController.expectOne(mockUrl);
          // Assert DELETE request
          expect(req.request.method).toEqual('DELETE');
          // Respond with an updated meal
          req.flush(mockId);
        };
      });

      it('should delete meal using meal object', () => {
        // Define mock meal variables
        const mockMeals = [...mockData];
        const mockMeal = mockMeals[0];
        const mockId = mockMeal.id;
        const apiUrl = (id: number) => {
          return `${service.mealsUrl}/${mockId}`;
        };
        const mockUrl = apiUrl(mockId);
        service.deleteMeal(mockMeal).subscribe(
          response => expect(response).toEqual(mockMeal.id),
          fail
        );
        // Receive DELETE request
        const req = httpTestingController.expectOne(mockUrl);
        // Assert DELETE request
        expect(req.request.method).toEqual('DELETE');
        // Respond with an updated meal
        req.flush(mockMeal.id);
      });
    });
  });

});


