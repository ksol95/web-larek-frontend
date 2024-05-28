import { AppStateModals } from "..";

export interface AppModal {
  //ID "открытого" продукта
  selectedProductID?: string;
  //Список всех модальных окон
  modals: AppStateModals | null, 
  //Количесвто товаров в корзине
  cartTotal: number,
  //Селектор контейнера для вывода всех товаров
  gallerySelector: string,
  //Селектор кнопки открытия корзины
  cartSelector: string,
}