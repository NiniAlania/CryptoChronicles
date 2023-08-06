import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoinMarketData } from '../../models';

@Component({
  selector: 'cc-coin-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent implements OnInit {
  @Input() coins: CoinMarketData[] | null = [];
  @Input() page: number | null = 1;
  @Input() pageSize: number | null = 100;
  @Input() currency: string | null = 'usd';
  @Input() matchingList: boolean[] | null = [];

  ngOnInit() {
  }

  @Output() addedToFavorites = new EventEmitter<{id: string, remove: boolean}>();
  get offSet() {
    if(this.page && this.pageSize) {
      return (this.page-1) * this.pageSize;
    } else {
      return 0;
    }
  }

  addToFavorites(event: {id: string, remove: boolean}) {
    this.addedToFavorites.emit(event);
  }
}
