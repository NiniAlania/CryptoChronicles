import { Component, Output, EventEmitter, Input } from '@angular/core';
import { emit } from 'process';
import { User } from 'src/app/authorization/models';

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
  currency: string = 'USD';
  logo: string = '../../../assets/usd.png';

  @Input() user: User | null = null;

  @Output('currentCurrency') currentCurrency = new EventEmitter<'usd' | 'eur'>();
  @Output('logout') logout = new EventEmitter<void>();

  constructor() {}

  changeCurrency(): void {

    this.elementDisplay = this.elementDisplay === 'none' ? 'block': 'none';

    this.buttonColor = this.buttonColor === 'white'? '#EFEFEF' : 'white';

    this.pointer = this.pointer === 'down' ? 'up' : 'down';
  }

  currencyChanged(currency: 'usd' | 'eur') {

    if(currency === 'usd') {
      this.usdIcon = 'fa-solid fa-circle-check';
      this.euIcon = 'fa-regular fa-circle';
      this.currency = 'USD';
      this.logo = '../../../assets/usd.png';
    } else if(currency === 'eur') {
      this.euIcon = 'fa-solid fa-circle-check';
      this.usdIcon = 'fa-regular fa-circle';
      this.currency = 'EUR';
      this.logo = '../../../assets/euro.webp';
    }

    this.currentCurrency.emit(currency);

  }

  logOut() {
    this.logout.emit();
    this.user = null;
  }
  
}