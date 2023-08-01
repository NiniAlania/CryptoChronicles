import { Component, Input } from '@angular/core';
import { CoinMarketData } from '../../models';

@Component({
  selector: 'cc-coin-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent {
  @Input() coins: CoinMarketData[] | null = [];
  @Input() page: number | null = 1;
  @Input() pageSize: number | null = 100;
  @Input() currency: string | null = 'usd';

  get offSet() {
    if(this.page && this.pageSize) {
      return (this.page-1) * this.pageSize;
    } else {
      return 0;
    }
  }
}
