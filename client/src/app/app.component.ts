import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(private basketService: BasketService, private accountService: AccountService) {}

  public ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  public loadCurrentUser(): void {
    const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token).subscribe(() => {
      console.log('User is loaded');
    });
  }

  public loadBasket(): void {
    const basketId = localStorage.getItem('basket_id');

    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('Basket is initialized');
      });
    }
  }
}
