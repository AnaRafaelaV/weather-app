import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Weather } from '../../weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input()
  weather: Weather = {};
  @Input()
  buttonClass: string = '';
  @Input()
  textClass: string = '';
  @Output() newItemEvent = new EventEmitter<Weather>();


  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Hnadler of the button 'delete' click event
   * @param weatherData 
   */
  removeCity(weatherData: Weather) {
    this.newItemEvent.emit(weatherData);
  }

}