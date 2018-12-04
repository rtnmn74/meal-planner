import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDetailComponent } from './meal-detail.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing-module';
import {MealComponent} from '../meal/meal.component';
import {MenuComponent} from '../menu/menu.component';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

describe('MealDetailComponent', () => {
  let component: MealDetailComponent;
  let fixture: ComponentFixture<MealDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealDetailComponent, MealComponent, MenuComponent ],
      imports: [FormsModule, AppRoutingModule, SelectDropDownModule, HttpClientModule],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
