import { IProduct, IClientForm, IOrderResult } from ".."

export interface IClient extends IClientForm {
  //Суммарная стоимость выбраных продуктов
  getTotalProducts: (products: IProduct[]) => number | null,
  //Массив ID товаров в корзине
  selectedProductId: (product: IProduct[]) => string[],
  //Метод отправки заказа от клиента на сервер
  postOrder: (orderBody: IClientForm, selectedProducts: string[], total: number | null) => Promise<IOrderResult>,
  //Очистить данные о клиенте
  clear: () => void,
}
