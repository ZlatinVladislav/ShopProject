import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public product: IProduct;
  public quantity = 1;

  public constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  public ngOnInit(): void {
    this.loadProduct();
  }

  public loadProduct(): void {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response) => {
        this.product = response;
        this.bcService.set('@productDetails', this.product.name);
      },
      (error) => console.log(error),
    );
  }

  public addItemToBasket(): void {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  public incrementItemQuantity(): void {
    this.quantity++;
  }

  public decrementItemQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
