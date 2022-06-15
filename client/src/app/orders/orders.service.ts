import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public baseUrl = environment.apiUrl;

  public constructor(private http: HttpClient) {}

  public getOrdersForUser() {
    return this.http.get(this.baseUrl + 'orders');
  }

  public getOrderDetailed(id: number) {
    return this.http.get(this.baseUrl + 'orders/' + id);
  }
}
