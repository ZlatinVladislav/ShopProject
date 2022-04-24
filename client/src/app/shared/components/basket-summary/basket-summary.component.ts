import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent {
  @Input() public isBasket = true;
  @Input() public items: IBasket[] | IOrderItem[] = [];
  @Input() public isOrder = false;

  @Output() public decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() public increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() public remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();

  public basket$: Observable<IBasket>;

  public decrementItemQuantity(item: IBasketItem): void {
    this.decrement.emit(item);
  }

  public incrementItemQuantity(item: IBasketItem): void {
    this.increment.emit(item);
  }

  public removeBasketItem(item: IBasketItem): void {
    this.remove.emit(item);
  }
}
