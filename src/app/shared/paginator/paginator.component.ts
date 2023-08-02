import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'cc-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() pageNumber: number | null = null;
  @Input() pageSize: number | null = null;
  @Input() collectionSize: number | null = null;

  @Output() pageChanged = new EventEmitter<number>();

  handlePageEvent(event: PageEvent) {
    this.pageChanged.emit(event.pageIndex+1);
  }
}
