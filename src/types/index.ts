export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
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
  //Очистить всю корзину
  removeAllProductsFromCart(): void,
}

export interface IOrderForm {
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

export interface ICartModel extends IOrderForm {
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
export interface IOrderBody extends IOrderForm, productsInCart, totalPrice { };

//Интерфейс для подключения к API
export interface IWebLarekApi {
  //Получить товары
  getProductList(): Promise<IProductList>,
  //Получить товар по ID
  getProduct(id: string): Promise<IProduct>,
  //Метод отправки заказа от клиента на сервер
  postOrder(data: IOrderBody): Promise<IOrderResult>,
}

//Модальное окно
export interface IModal {
  open(): void,
  close(): void,
  loadContent(content: HTMLElement): void,
}

//Тип для отображения карточки cssтовара - полная версия
export type ProductFullView = {
  title: string,
  price: totalPrice,
  description: string,
  image: string,
  category: ProductCategory,
  selected: boolean,
  addToCart?: HTMLButtonElement,
  removeFromCart?: HTMLButtonElement,
}
//Тип отображения карточки товара - версия для каталога на главной странице
export type ProductCatalogView = Omit<ProductFullView, 'description' | 'removeFromCart' | 'addToCart'>;
//Тип отображения карточки товара - версия для корзины
export type ProductCartView = Pick<ProductFullView, 'title' | 'price' | 'removeFromCart'> ;
//Интерфейс события клика внутри карточки товара
interface IProductActions {
  onClick: (event: MouseEvent) => void;
}

//Отображение главной страницы
export interface IPageView {
  //Массив карточек с товарами
  catalog: HTMLElement[];
  //Количество добавленых в корзину товаров
  cartCounter: number;
  //Состояние страницы для css класса page__wrapper_locked
  locked: boolean;
}

//Отображение корзины
export interface ICartView {
  //Шаблон карточек товаров
  products: ProductCartView[];
  //Общая стоимость товаров
  total: totalPrice;
}

