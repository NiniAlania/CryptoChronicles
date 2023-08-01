import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  arrow: string = 'up';
  elementDisplay: string = 'none';

  @Input() current: number | null = 100;
  @Output('pageSizeChanged') pageSizeChanged = new EventEmitter<number>();

  setPageSize(size: number) {
    this.pageSizeChanged.emit(size);
    this.current = size;

  }


  showPageSizes() {

    this.arrow = this.arrow === 'up' ? 'down' : 'up';
    this.elementDisplay = this.elementDisplay === 'none'? 'flex' : 'none';
  }


} 
