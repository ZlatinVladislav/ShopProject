import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss'],
})
export class PagingHeaderComponent {
  @Input() public pageNumber: number;
  @Input() public pageSize: number;
  @Input() public totalCount: number;
}
