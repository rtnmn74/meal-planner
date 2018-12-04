import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MealComponent} from './meal.component';
import {MealDetailComponent} from '../meal-detail/meal-detail.component';
import {AppRoutingModule} from '../app-routing-module';
import {MenuComponent} from '../menu/menu.component';
import {FormsModule} from '@angular/forms';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule, By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MealService} from './meal.service';

describe('MealComponent', () => {
  let component: MealComponent;
  let fixture: ComponentFixture<MealComponent>;
  let addElement: DebugElement;
  let mealService: MealService;
  let httpClientSpy: { get: jasmine.Spy };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MealComponent, MealDetailComponent, MenuComponent],
      imports: [AppRoutingModule, FormsModule, SelectDropDownModule, HttpClientModule, BrowserModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    mealService = new MealService(<any>httpClientSpy, null);
    addElement = fixture.debugElement.query(By.css('button[type=add]'));
  });

  // Test to verify app component creates properly
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test add meal method
  it('should call the add method', async(() => {
    spyOn(component, 'add');
    addElement.nativeElement.click();
    expect(component.add).toHaveBeenCalledTimes(1);
  }));
});
