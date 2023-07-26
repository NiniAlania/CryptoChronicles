import { Component } from '@angular/core';
import { HeaderService } from '../../services';

@Component({
  selector: 'cc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title$ = this.headerService.title$;
  
  constructor(private headerService: HeaderService) { }
}
