import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdersBackendService } from '../autogenerated/api.client.generated';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, OrdersRoutingModule],
  providers: [OrdersBackendService],
})
export class OrdersModule {}
