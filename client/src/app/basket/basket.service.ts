import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import {
  BasketBackendService,
  BasketItemViewModel,
  CustomerBasketViewModel,
  IBasketItemViewModel,
  ICustomerBasketViewModel,
  IProductDetailsViewModel,
  PaymentsBackendService,
} from '../autogenerated/api.client.generated';
import { handleError } from '../core/custom-operators';
import { Basket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMerhod';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  public basketSource = new BehaviorSubject<CustomerBasketViewModel>(null);
  public basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  public basketTotal$ = this.basketTotalSource.asObservable();
  public basket$ = this.basketSource.asObservable();
  private shipping = 0;

  public constructor(
    private readonly basketBackendService: BasketBackendService,
    private readonly paymentService: PaymentsBackendService,
    private readonly toastr: ToastrService,
  ) {}

  public createPaymentIntent(): Observable<void> {
    return this.paymentService.createOrUpdatePaymentIntent(this.getCurrentBasketValue().id.toString()).pipe(
      map((basket: CustomerBasketViewModel) => {
        this.basketSource.next(basket);
      }),

      handleError(this.toastr),
    );
  }

  public setShippingPrice(deliveryMethod: IDeliveryMethod): void {
    this.shipping = deliveryMethod.price;
    const basket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }

  public getBasket(id: string): Observable<void> {
    return this.basketBackendService.getBasketById(id).pipe(
      map((basket: CustomerBasketViewModel) => {
        this.basketSource.next(basket);
        this.shipping = basket.shippingPrice;
        this.calculateTotals();
      }),

      handleError(this.toastr),
    );
  }

  public setBasket(basket: CustomerBasketViewModel): Subscription {
    return this.basketBackendService
      .updateBasket(basket)
      .pipe(handleError(this.toastr))
      .subscribe((basket: CustomerBasketViewModel) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      });
  }

  public getCurrentBasketValue(): CustomerBasketViewModel {
    return this.basketSource.value;
  }

  public addItemToBasket(item: IProductDetailsViewModel, quantity = 1): void {
    const itemToAdd: BasketItemViewModel = new BasketItemViewModel(this.mapProductItemToBasketItem(item, quantity));

    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);

    this.setBasket(new CustomerBasketViewModel(basket));
  }

  public incrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === item.id);

    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  public decrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === item.id);

    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }

    this.setBasket(basket);
  }

  public removeItemFromBasket(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();

    if (basket.items.some((x) => x.id === item.id)) {
      basket.items = basket.items.filter((i) => i.id !== item.id);

      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  public deleteLocalBasket(): void {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  public deleteBasket(basket: CustomerBasketViewModel): Subscription {
    return this.basketBackendService
      .deleteBasket(basket.id)
      .pipe(handleError(this.toastr))
      .subscribe(() => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);

        localStorage.removeItem('basket_id');
      });
  }

  private calculateTotals(): void {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subtotal + shipping;

    this.basketTotalSource.next({ shipping, total, subtotal });
  }

  private addOrUpdateItem(
    items: BasketItemViewModel[],
    itemToAdd: BasketItemViewModel,
    quantity: number,
  ): BasketItemViewModel[] {
    const index = items.findIndex((i) => i.id === itemToAdd.id);

    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }

    return items;
  }

  private createBasket(): ICustomerBasketViewModel {
    const basket = new Basket();

    localStorage.setItem('basket_id', basket.id);

    return basket;
  }

  private mapProductItemToBasketItem(item: IProductDetailsViewModel, quantity: number): IBasketItemViewModel {
    return {
      id: item.id,
      productName: item.name,
      pictureUrl: item.pictureUrl,
      quantity,
      price: item.price,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
