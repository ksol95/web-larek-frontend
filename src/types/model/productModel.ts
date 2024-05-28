import { IProduct, IProductList } from "..";

export interface IProductModel extends IProductList {
  //Получить товары
  getProductList: () => Promise<IProductList>,
  //Получить товар по ID
  getProduct: (id: string) => Promise<IProduct>,
  //Проверить добавлен ли товар в корзину
  inCart: (id: string) => void,
  //Добавить товар в корзину
  addToCart: (id: string) => void,
  //Убрать товар из корзины
  removeProductFromCart: (id: string) => void,
  //Очитсить всю корзину
  removeAllProductsFromCart: () => void,
}