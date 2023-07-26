import { Component, Input } from '@angular/core';
import { CoinMarketData } from '../../models';

@Component({
  selector: 'cc-coin-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent {
  @Input() coins: CoinMarketData[] = [];
}
