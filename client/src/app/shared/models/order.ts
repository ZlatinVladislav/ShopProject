import { IAddress } from './address';

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: IAddress;
}

export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: IAddress;
  deliveryMethod: string;
  shipingPrice: number;
  orderItems: OrderItem[];
  subTotal: number;
  total: number;
  status: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  quantity: string;
  price: number;
}
