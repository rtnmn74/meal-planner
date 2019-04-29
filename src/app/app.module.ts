import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MealComponent} from './meal/meal.component';
import {MenuComponent} from './menu/menu.component';
import {AppRoutingModule} from './app-routing-module';
import {FormsModule} from '@angular/forms';
import {MealDetailComponent} from './meal-detail/meal-detail.component';
import {MessagesComponent } from './messages/messages.component';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreSettingsToken} from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MealComponent,
    MenuComponent,
    MealDetailComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SelectDropDownModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    // Mock API using In Memory API Module
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  exports: [
    MealComponent,
    MenuComponent,
    HeaderComponent,
    MealDetailComponent,
    HeaderComponent,
    MessagesComponent
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
