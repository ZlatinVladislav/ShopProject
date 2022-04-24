import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent {
  @Input() public pageSize: number;
  @Input() public totalCount: number;
  @Input() public pageNumber: number;
  @Output() public pageChanged = new EventEmitter<number>();

  public onPageChanged(event: any): void {
    this.pageChanged.emit(event.page);
  }
}
