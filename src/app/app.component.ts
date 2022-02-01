import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import * as moment from 'moment';
import { Weather } from './weather.interface';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weather: Weather = {};
  newWeather: Weather = {};
  hasDeleteOption = "buttonHidden";
  addedCities: Weather[] = [];
  addedCitiesName: string[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private weatherService: WeatherService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getLocation();
  }

  /**
   * Try to get the user location otherwise will use a default one
   */
  getLocation() {
    return new Promise(async (resolve) => {
      await this.getBrowserLocation();

      if (!this.weather.lat) {
        this.weather.lat = 39.74362;
        this.weather.lon = -8.80705;
      }

      this.getCurrentWeather();
    });

  }

  /**
   * Gets user location
   * @returns 
   */
  getBrowserLocation() {
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((success) => {
          this.weather.lat = success.coords.latitude;
          this.weather.lon = success.coords.longitude;
          resolve(true)
        },
          err => resolve(false));
      }else{
        resolve(false);
      }
    });
  }
  /**
   * Invoke the service to get the weather data
   */
  getCurrentWeather() {
    this.weatherService.getCurrentWeatherByUserLocation(this.weather.lat, this.weather.lon).subscribe((data: any) => {
      this.setCityWeather(data)
      this.weather = this.newWeather;

      this.getLocationWeatherforecast(this.weather);
    });
  }

  /**
   * Invoke the service to get the seven day weather forecast data
   * @param weather 
   */
  getLocationWeatherforecast(weather: Weather) {
    this.weatherService.getForecast(weather.lat, weather.lon).subscribe((data: any) => {
      weather.forecast = [];
      for (let i = 1; i < data.daily.length; i++) {
        let weatherForecast: Weather = {}
        let forecastData = data.daily[i];
        weatherForecast.date = moment(new Date(forecastData.dt * 1000)).format("DD MMM YYYY");
        weatherForecast.temp_max = forecastData.temp.max;
        weatherForecast.temp_min = forecastData.temp.min;
        weatherForecast.humidity = forecastData.humidity;
        weatherForecast.description = forecastData.weather[0].description;
        weatherForecast.icon = `http://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;
        weatherForecast.sunrise = moment(new Date(forecastData.sunrise * 1000)).format("HH:MM");
        weatherForecast.sunset = moment(new Date(forecastData.sunset * 1000)).format("HH:MM");
        weatherForecast.imgTitle = forecastData.weather[0].main;
        weather.forecast.push(weatherForecast);
      }
    }, err => {
      this.openSnackBar("Error loading city weather's forecast", '');
    });
  }

  /**
   * Handler of the add city event
   * @param newCity 
   */
  addCity(newCity: string) {
    this.weatherService.getWeatherByCityName(newCity).subscribe((data: any) => {
      this.setCityWeather(data);
      this.getLocationWeatherforecast(this.newWeather);
      const index = this.addedCitiesName.indexOf(`${this.newWeather.name}, ${this.newWeather.country}`);
      if (index === -1) {
        this.addedCitiesName.push(`${this.newWeather.name}, ${this.newWeather.country}`);
        this.addedCities.push(this.newWeather);
        this.openSnackBar("City successfully added", '');
      } else {
        this.openSnackBar("City already added", '');
      }

    }, err => {
      this.openSnackBar("City not found. Enter a valid city name.", '');
    }
    );
  }

  /**
  * Handler of the remove event
  * @param weatherData 
  */
  removeCity(weatherData: Weather) {
    this.addedCities = this.addedCities.filter((city: Weather) => city != weatherData);
    this.addedCitiesName = this.addedCitiesName.filter((cityName: string) => cityName != `${weatherData.name}, ${weatherData.country}`);
    this.openSnackBar("City successfully removed", '');
  }

  /**
   * Set the weather interface properties each time it's instanciated
   * @param data 
   */
  setCityWeather(data: any) {
    this.newWeather = {
      lat: data.coord.lat,
      lon: data.coord.lon
    };
    this.newWeather.name = data.name;
    this.newWeather.country = data.sys.country;
    this.newWeather.date = moment(new Date(data.dt * 1000)).format("DD MMM YYYY HH:MM");
    this.newWeather.temp = data.main.temp;
    this.newWeather.temp_max = data.main.temp_max;
    this.newWeather.temp_min = data.main.temp_min;
    this.newWeather.humidity = data.main.humidity;
    this.newWeather.description = data.weather[0].description;
    this.newWeather.feels_like = data.main.feels_like;
    this.newWeather.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    this.newWeather.sunrise = moment(new Date(data.sys.sunrise * 1000)).format("HH:MM");
    this.newWeather.sunset = moment(new Date(data.sys.sunset * 1000)).format("HH:MM");
    this.newWeather.imgTitle = data.weather[0].main;
  }

  /**
   * Shows a SnackBar to give feedback to the user
   * @param msg1 
   * @param msg2 
   */
  openSnackBar(msg1: string, msg2: string) {
    this._snackBar.open(msg1, msg2, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['ligth_blue_background_color']
    });
  }

}
