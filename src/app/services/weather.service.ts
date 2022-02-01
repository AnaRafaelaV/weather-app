import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url = environment.url;
  urlForecaste = environment.urlForecaste
  apiKey = environment.apiKey

  constructor(private http: HttpClient) { }

  getCurrentWeatherByUserLocation(lat: number, lon: number) {
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', 'metric')
    .set('appid', this.apiKey);

    return this.http.get(this.url, { params,
      context: withCache()
    });
  }

  getForecast(lat: number, lon: number){
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', 'metric')
    .set('exclude', 'current,minutely,hourly,alerts')
    .set('appid', this.apiKey);

    return this.http.get(this.urlForecaste, { params,
      context: withCache()
    });
  }

  getWeatherByCityName(name: string){
    let params = new HttpParams()
    .set('q', name)
    .set('units', 'metric')
    .set('appid', this.apiKey);

    return this.http.get(this.url, { params,
      context: withCache()
    });
  }
  
}
