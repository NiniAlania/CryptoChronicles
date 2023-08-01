import { Component, Input } from '@angular/core';
import { CoinMarketData } from '../../models';

@Component({
  selector: 'cc-coins-table-item',
  templateUrl: './coins-table-item.component.html',
  styleUrls: ['./coins-table-item.component.scss']
})
export class CoinsTableItemComponent {
  @Input() index: number = 1;
  @Input() coin: CoinMarketData | null = null;
  @Input() currency: string | null = null;
  isColored = false
 
  addToFavorites() {
    this.isColored = !this.isColored;
  }

  get currencySymbol() {
    console.log(this.currency);
    if (this.currency === 'usd') {
      return '$'
    } else if (this.currency === 'eur') {
      return '€'
    } else {
       return 'ara';
    }
  }


}
