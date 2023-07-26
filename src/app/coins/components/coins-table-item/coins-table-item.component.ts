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

  isColored = false
 
  addToFavorites() {
    this.isColored = !this.isColored;
  }
}
