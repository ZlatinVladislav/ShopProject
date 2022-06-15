import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProductDetailsComponent, ProductCreateComponent],
  imports: [SharedModule, ShopRoutingModule],
})
export class ShopModule {}
