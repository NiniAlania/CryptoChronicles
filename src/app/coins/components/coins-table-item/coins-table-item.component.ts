import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinMarketData } from '../../models';

@Component({
  selector: 'cc-coins-table-item',
  templateUrl: './coins-table-item.component.html',
  styleUrls: ['./coins-table-item.component.scss']
})
export class CoinsTableItemComponent implements OnChanges {
  @Input() index: number = 1;
  @Input() coin: CoinMarketData | null = null;
  @Input() currency: string | null = null;
  @Input() match: boolean | undefined = false;

  @Output() addedToFavorites = new EventEmitter<void>(); 
  isColored: boolean | undefined = false;

  ngOnChanges() {
    this.isColored = this.match;
  }

  addToFavorites() {
    this.isColored = !this.isColored;
    this.addedToFavorites.emit();
  }

  get currencySymbol() {
    if (this.currency === 'usd') {
      return '$'
    } else if (this.currency === 'eur') {
      return '€'
    } else {
       return 'ara';
    }
  }


}
