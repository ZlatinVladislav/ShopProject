import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProductDetailsViewModel, ProductsBackendService } from 'src/app/autogenerated/api.client.generated';
import { BasketService } from 'src/app/basket/basket.service';
import { handleError } from 'src/app/core/custom-operators';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public product: IProductDetailsViewModel;
  public quantity = 1;

  public constructor(
    private readonly shopService: ShopService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bcService: BreadcrumbService,
    private readonly basketService: BasketService,
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  public ngOnInit(): void {
    this.loadProduct();
  }

  public loadProduct(): void {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((response) => {
      this.product = response;
      this.bcService.set('@productDetails', this.product.name);
    });
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
