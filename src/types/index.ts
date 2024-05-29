export type FormErrors = Partial<Record<keyof IClientForm, string>>;
export type PaymentMethod = 'online' | 'offline';
export type totalPrice = { total: number | null };
//Тип принимает ограниченые значения соответсвующие с названиями категорий товаров с сервера
export type ProductCategory =
  'софт-скил' |
  'хард-скил' |
  'другое' |
  'дополнительное' |
  'кнопка'
  ;

export type Product = {
  id: string,
  description: string,
  image: string,
  title: string,
  category: ProductCategory,
  price: totalPrice,
}

export interface IProduct extends Product {
  selected: boolean;
}

export interface IProductList {
  total: number,
  items: IProduct[],
}

export interface IProductModel {
  //Получить товары
  setProducts(products: IProduct[]): void,
  //Проверить добавлен ли товар в корзину
  inCart(id: string): boolean,
  //Вывести товары
  getProducts(): IProduct[],
  //Добавить товар в корзину
  addToCart(id: string): void,
  //Убрать товар из корзины
  removeProductFromCart(id: string): void,
  //Очитсить всю корзину
  removeAllProductsFromCart(): void,
}

export interface IClientForm {
  id?: string, //На будущее
  payment: PaymentMethod,
  email: string,
  phone: string,
  address: string,
}

export interface IOrderResult {
  id: string,
  total: totalPrice,
  error?: string,
}

export interface ICartModel extends IClientForm {
  //Суммарная стоимость выбраных продуктов
  getTotalProducts(products: IProduct[]): totalPrice,
  //Массив ID товаров в корзине
  selectedProductId(product: IProduct[]): string[],
  //Очистить данные о клиенте
  clear(): void,
}

export type productsInCart = {
  items: [
    id: string,
  ]
}
//Объект для отправки заказа
export interface orderBody extends IClientForm, productsInCart, totalPrice { };

//Интерфейс для подключения к API
export interface IWebLarekApi {
  //Получить товары
  getProductList(): Promise<IProductList>,
  //Получить товар по ID
  getProduct(id: string): Promise<IProduct>,
  //Метод отправки заказа от клиента на сервер
  postOrder(data: orderBody): Promise<IOrderResult>,
}

//Модальное окно
export interface IModal {
  open(): void,
  close(): void,
  loadContent(content: HTMLElement): void,
}

//Тип для отображения товара - полная версия
export type IProductFullView = {
  title: string,
  price: totalPrice,
  description: string,
  image: string,
  category: ProductCategory,
  addToCart?: HTMLButtonElement,
  removeFromCart?: HTMLButtonElement,
}
//Тип отображения товара - версия для каталога на главной странице
export type IProductCatalogView = Omit<IProductFullView, 'description' | 'removeFromCart' | 'addToCart'>;
//Тип отображения товара - версия для корзины
export type IProductCartView = Pick<IProductFullView, 'title' | 'price' | 'removeFromCart'> ;

//Отображение главной страницы
export interface IPageView {
  //Количество добавленых в корзину товаров
  cartCounter: number;
  //Массив карточек с товарами
  catalog: IProductFullView[];
  //Состояние страницы для css класса page__wrapper_locked
  locked: boolean;
}

//Отображение корзины
export interface ICartView {
  //Шаблон карточек товаров
  products: IProductCartView[];
  //Общая стоимость товаров
  total: totalPrice;
}

