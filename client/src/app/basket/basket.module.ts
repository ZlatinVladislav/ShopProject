import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';

@NgModule({
  declarations: [BasketComponent],
  imports: [SharedModule, BasketRoutingModule],
})
export class BasketModule {}
