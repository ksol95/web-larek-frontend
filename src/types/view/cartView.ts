import { IProductList } from ".."

export interface ICartView {
  productList: IProductList,
  //Получить общее число продуктов в корзине
  productCount: () => number,
  cartTotal: number,
}

export interface ICartViewSettings{
  productListSelector: string,
  cartCounterSelector: string,
  totalSelector: string,
}