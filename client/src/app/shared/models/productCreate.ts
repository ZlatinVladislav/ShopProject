export interface IProductCreate {
  name: string;
  description: string;
  price: number;
  pictureForm: FormData;
  productTypeId: number;
  productBrandId: number;
}
