import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MealDetailComponent} from './meal-detail/meal-detail.component';
import {MealComponent} from './meal/meal.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing-module';
import {MenuComponent} from './menu/menu.component';
import {FormsModule} from '@angular/forms';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, MealDetailComponent, MealComponent, HeaderComponent, MenuComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        SelectDropDownModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: false })
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
