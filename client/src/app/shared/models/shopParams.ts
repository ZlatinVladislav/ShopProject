// export enum ShopParams {
//   brandId = 0,
//   typeId = 0,
//   sort = 'name',
//   pageNumber = 1,
//   pageSize = 6,
//   search,
// }

export class ShopParams {
  public brandId = 0;
  public typeId = 0;
  public sort = 'name';
  public pageNumber = 1;
  public pageSize = 6;
  public search: string;
}
