import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherService } from './services/weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let weatherMock = {"coord":{"lon":-8.4201,"lat":41.5503},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":9.2,"feels_like":9.2,"temp_min":8.13,"temp_max":10.62,"pressure":1024,"humidity":66,"sea_level":1024,"grnd_level":1001},"visibility":10000,"wind":{"speed":0.75,"deg":348,"gust":0.84},"clouds":{"all":0},"dt":1642962061,"sys":{"type":1,"id":6900,"country":"PT","sunrise":1642924400,"sunset":1642959439},"timezone":0,"id":2742032,"name":"Braga","cod":200};
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should add city', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let service = TestBed.get(WeatherService);
    spyOn(service, 'getWeatherByCityName').and.returnValue(of(weatherMock))
    app.addCity('Braga');
    expect(app.addedCities.length).toEqual(1);
  }));

  it('should remove city', ()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let service = TestBed.get(WeatherService);
    spyOn(service, 'getWeatherByCityName').and.returnValue(of(weatherMock))
    app.addCity('Braga');
    app.removeCity(app.addedCities[0]);
    expect(app.addedCities.length).toEqual(0);
  });

});
