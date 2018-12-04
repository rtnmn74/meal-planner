import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import {MealComponent} from '../meal/meal.component';
import {AppRoutingModule} from '../app-routing-module';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {FormsModule} from '@angular/forms';
import {MealDetailComponent} from '../meal-detail/meal-detail.component';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule, By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let generateElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent, MealComponent, MealDetailComponent ],
      imports: [AppRoutingModule, SelectDropDownModule, FormsModule, HttpClientModule, BrowserModule ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    generateElement = fixture.debugElement.query(By.css('button[type=generate]'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the capture screen method', async(() => {
    spyOn(component, 'captureScreen');
    generateElement.nativeElement.click();
    expect(component.captureScreen).toHaveBeenCalledTimes(1);
  }));

});
