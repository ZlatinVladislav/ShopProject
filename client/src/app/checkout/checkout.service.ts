import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMerhod';
import { IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  public baseUrl = environment.apiUrl;

  public constructor(private http: HttpClient) {}

  public createOrder(order: IOrderToCreate): any {
    return this.http.post(this.baseUrl + 'orders', order);
  }

  public getDeliveryMethods(): any {
    return this.http.get(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      }),
    );
  }
}
