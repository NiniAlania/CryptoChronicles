import { Component, Input } from '@angular/core';
import { CoinDetails, CoinInfo } from '../../models';

@Component({
  selector: 'cc-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent {
  @Input() coinDetails: CoinDetails | null | undefined;
  @Input() coinInfo: CoinInfo | null | undefined;
  @Input() currency:  string | null = 'usd';



  get currencySymbol() {
    if (this.currency === 'usd') {
      return '$'
    } else if (this.currency === 'eur') {
      return '€'
    } else {
       return '';
    }
  }

}
