import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  @Input() public appStepper: CdkStepper;
  public basket$: Observable<IBasket>;

  public constructor(private basketService: BasketService, private toastr: ToastrService) {}

  public ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  public createPaymentIntent(): Subscription {
    return this.basketService.createPaymentIntent().subscribe(
      () => {
        this.toastr.success('Payment created intent');
        this.appStepper.next();
      },
      (error) => {
        console.log(error);
        this.toastr.error(error);
      },
    );
  }
}
