import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public orders: IOrder[];

  public constructor(private ordersService: OrdersService) {}

  public ngOnInit(): void {
    this.getOrders();
  }

  public getOrders(): void {
    this.ordersService.getOrdersForUser().subscribe(
      (order: IOrder[]) => {
        this.orders = order;
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
