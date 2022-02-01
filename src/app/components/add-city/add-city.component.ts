import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  hidePlaceholder = false;
  newCityName: any;
  @Output() newItemEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Handler of the button's 'Add city' click event
   * Emits an event to the parent component
   * @param city 
   */
  addCity(city: string) {
    this.newItemEvent.emit(city);
    this.newCityName = null;
  }

}
