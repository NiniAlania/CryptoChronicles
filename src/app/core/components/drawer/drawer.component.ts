import { Component, Output, EventEmitter } from '@angular/core';
import { emit } from 'process';

@Component({
  selector: 'cc-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {

  elementDisplay: string = 'none';
  buttonColor: string = 'white';
  pointer: string = 'down';
  usdIcon: string = 'fa-regular fa-circle';
  euIcon: string = 'fa-regular fa-circle';

  @Output('currentCurrency') currentCurrency = new EventEmitter<string>();

  constructor() {}

  changeCurrency(): void {

    this.elementDisplay = this.elementDisplay === 'none' ? 'inline': 'none';

    this.buttonColor = this.buttonColor === 'white'? '#EFEFEF' : 'white';

    this.pointer = this.pointer === 'down' ? 'up' : 'down';
  }

  currencyChanged(currency: string) {

    if(currency === 'usd') {
      this.usdIcon = 'fa-solid fa-circle-check';
      this.euIcon = 'fa-regular fa-circle';
    } else if(currency === 'eur') {
      this.euIcon = 'fa-solid fa-circle-check';
      this.usdIcon = 'fa-regular fa-circle';
    }

    this.currentCurrency.emit(currency);

  }

  
}


// #EFEFEF