import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { CustomerBasketViewModel, IUserViewModel } from 'src/app/autogenerated/api.client.generated';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public basket$: Observable<CustomerBasketViewModel>;
  public currentUser$: Observable<IUserViewModel>;

  public constructor(private basketService: BasketService, private accountService: AccountService) {}

  public ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  public logOut(): void {
    this.accountService.logout();
  }
}
