import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasketTotals } from '../shared/models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public basketTotals$: Observable<IBasketTotals>;
  public checkoutForm: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private basketService: BasketService,
  ) {}

  public ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
    this.getDeliveryMethodValue();
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  public createCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),

      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required],
      }),

      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required],
      }),
    });
  }

  public getAddressFormValues(): void {
    this.accountService.getUserAddress().subscribe((address) => {
      if (address) {
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    });
  }

  public getDeliveryMethodValue(): void {
    const basket = this.basketService.getCurrentBasketValue();

    if (basket.deliveryMethodId !== null) {
      this.checkoutForm.get('deliveryForm').get('deliveryMethod').patchValue(basket.deliveryMethodId);
    }
  }
}
