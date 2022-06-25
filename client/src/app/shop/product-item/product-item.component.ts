import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() public product: IProduct;

  public constructor(private basketService: BasketService) {}

  public addItemToBasket(): void {
    this.basketService.addItemToBasket(this.product);
  }
}
