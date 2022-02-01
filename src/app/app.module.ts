import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherComponent } from './components/weather/weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { MatCardModule } from '@angular/material/card';
import { AddCityComponent } from './components/add-city/add-city.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ForecastComponent,
    AddCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpCacheInterceptorModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
