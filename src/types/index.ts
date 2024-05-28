// Модальные окна
export enum AppStateModals {
  product,
  cart,
  orderPay,
  orderClient,
  orderSuccess
}
export type ProductCategory =
  'софт-скил' |
  'хард-скил' |
  'другое' |
  'дополнительное' |
  'кнопка'
  ;

export type Currency = 'синапсов' | 'рублей';
export type PaymentMethod = 'online' | 'offline';

export interface IProduct {
  id: string,
  description: string,
  image: string,
  title: string,
  category: ProductCategory,
  price: number | null,
  inCart?: boolean, //Добавлен ли товар в корзину
}

export interface IProductList {
  total: number,
  items: IProduct[],
}

export interface IClientForm {
  id?: string, //На будущее
  payment: PaymentMethod,
  email: string,
  phone: string,
  address: string,
}

export type FormErrors = Partial<Record<keyof IClientForm, string>>;

export interface IOrderResult {
  id: string,
  total: number,
  error?: string,
}