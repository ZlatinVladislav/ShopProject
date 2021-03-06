import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrderDetailsViewModal } from 'src/app/autogenerated/api.client.generated';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  public order: IOrderDetailsViewModal;

  public constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private orderService: OrdersService,
  ) {
    this.breadcrumbService.set('@OrderDetailed', '');
  }

  public ngOnInit(): void {
    this.orderService
      .getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
      .subscribe((order: IOrderDetailsViewModal) => {
        this.order = order;
        this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      });
  }
}
