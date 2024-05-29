# Проектная работа "Вебларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
 src/ — исходные файлы проекта
 src/components/ — папка с JS компонентами
 src/components/base/ — папка с базовым кодом

Важные файлы:
 src/pages/index.html — HTMLфайл главной страницы
 src/types/index.ts — файл с типами
 src/index.ts — точка входа приложения
 src/styles/styles.scss — корневой файл стилей
 src/utils/constants.ts — файл с константами
 src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Документация
## 1. Описание данных

Тип для получения ошибки валидации формы клиента
```
export type FormErrors = Partial<Record<keyof IClientForm, string>>;
```

Тип для ограничения выбора значений платёжного метода
```
export type PaymentMethod = 'online' | 'offline';
```

Тип вывода стоимости, для учёта нулевой стоимости.
```
export type totalPrice = { total: number | null };
```

Тип принимает ограниченые значения соответсвующие с названиями категорий товаров с сервера
```
export type ProductCategory =
  'софт-скил' |
  'хард-скил' |
  'другое' |
  'дополнительное' |
  'кнопка'
  ;
```

Тип для ограничения значений способов оплаты
```
export type PaymentMethod = 'online' | 'offline';
```

Тип данных "Товар" содержит в себе все поля приходящих с сервера.

Интерфейс IProduct основан на типе Product и дополняет его свойством "selected" типа boolean.
Предпологается что даное свойство сообщает находится ли товар в корзине или нет (по умолчанию false).
```
export type Product = {
  id: string,
  description: string,
  image: string,
  title: string,
  category: ProductCategory,
  price: totalPrice,
}

export interface IProduct extends Product{
  selected: boolean;
}
```


Интерфейс объекта приходящего с сервара в ответ на запрос о получении всех товаров в магазине. Содержит в себе число всех товаров и массив товаров типа IProduct
```
export interface IProductList {
  total: number,
  items: IProduct[],
}
```

Интерфейс описывает модель продукта. Интерфейс содержит методы для получения/удаления данных типа IProduct, а так же добавить товар в корзину по средством установки свойства selected у товара в состояние true. 
```
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
```

Интерфейс описывает объект "Клиент". Данный объект хранит информацию введеную пользователем в момент оформления заказа. 
```
export interface IClientForm {
  id?: string, //На будущее
  payment: PaymentMethod,
  email: string,
  phone: string,
  address: string,
}
```

Тип описывает объект который хранит в себе ответ от сервера после отправки заказа.
```
export interface IOrderResult {
  id: string,
  total: number,
  error?: string,
}
```

Тип описывает объект который хранит в себе ответ от сервера после отправки заказа.
```
export interface ICartModel extends IClientForm {
  //Суммарная стоимость выбраных продуктов
  getTotalProducts(products: IProduct[]): totalPrice,
  //Массив ID товаров в корзине
  selectedProductId(product: IProduct[]): string[],
  //Очистить данные о клиенте
  clear(): void,
}
```

Объект для отправки заказа
```
export type productsInCart = {
  items: [
    id: string,
  ]
}

export interface orderBody extends IClientForm, productsInCart, totalPrice { };

```

Интерфейс для подключения к API
```
export interface IWebLarekApi {
  //Получить товары
  getProductList(): Promise<IProductList>,
  //Получить товар по ID
  getProduct(id: string): Promise<IProduct>,
  //Метод отправки заказа от клиента на сервер
  postOrder(data: orderBody): Promise<IOrderResult>,
}
```

Модальное окно
```
export interface IModal {
  open(): void,
  close(): void,
  loadContent(content: IModalContent): void,
}
```

Тип для отображения товара - полная версия в модальном окне
```
export type IProductFullView = {
  title: string,
  price: totalPrice,
  description: string,
  image: string,
  category: ProductCategory,
  addToCart?: HTMLButtonElement,
  removeFromCart?: HTMLButtonElement,
}
```

Тип отображения товара - версия для каталога на главной странице
```
export type IProductCatalogView = Omit<IProductFullView, 'description' | 'removeFromCart' | 'addToCart'>;
```

Отображение главной страницы
```
export interface IPageView {
  //Количество добавленых в корзину товаров
  cartCounter: number;
  //Массив карточек с товароами
  catalog: IProductFullView[];
  //Состояние страницы для css класса page__wrapper_locked
  locked: boolean;
}
```


Тип отображения товара - версия для корзины
  ```
  export type IProductCartView = Pick<IProductFullView, 'title' | 'price' | 'removeFromCart'> ;
  ```

Отображение корзины
```
export interface ICartView {
  //Шаблон карточек товаров
  products: IProductCartView[];
  //Общая стоимость товаров
  total: totalPrice;
}
```

## 2. Модели данных

Были выделены две модели данных:

  1. Продукт - для работы с данными товара, добавления/удаления в корзину.
  ```
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
  ```
  2. Корзина - интерфейс расширяет IClientForm методами необходимыми для работы с данными клиента.
  ```
  export interface ICartModel extends IClientForm {
    //Суммарная стоимость выбраных продуктов
    getTotalProducts(products: IProduct[]): totalPrice,
    //Массив ID товаров в корзине
    selectedProductId(product: IProduct[]): string[],
    //Очистить данные о клиенте
    clear(): void,
  }
  ```
  

## 5. Компоненты
В проекте присутсвуют базовые компоненты:
  - api для работы с сервером;
  - component абстрактный класс для определения прочих компонентов приложения;
  - event брокер событий для реализации связи между моделью данных и видом с помощью событий. (необходимые события в приложения описаны в пункте 4).

  ### WebLarekApi
  На основе базового компонента api необходимо реализовать класс "WebLarekApi" имплементируя одноименный интерфейс "IWebLarekApi".
  данный класс реализует методы для работы с апи получая данные в нужном формате, такие как "список товаров" и "товар по ID", так же в данном классе реализован метод отправки на сервер заказа.

  ### Page
  Данный компонент основывается на базовом классе "component". Page необходим для управления интерфейсом страницы приложения, а именно:
    - Установка количества товаров на нкопке корзины;
    - Рендера карточек товара на главной странице (в каталоге);
    - "Блокировка" страницы при открытии модального окна.

## 4. Описание событий

События хранятся в объекте - "events" описаном в файле "./utils/constants.ts".
```
export enum events {
  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close',

  //Изменение статуса "в корзине"
  PRODUCT_CHANGE = 'product:change',
  //Открыть модальное окно с подробным описанием товара
  PRODUCT_OPEN = 'product:open',
  //Событие открытия окна с корзиной
  CART_OPEN = 'cart:open',
  //Открыть модальное окно с формой данных о клиенте
  CLIENT_OPEN = 'client:open',
  //Отправка формы заказа
  CLIENT_SUBMIT = 'client:submit',
  //Выбор типа оплаты
  CLIENT_PAYMENT_TYPE = 'client:changePaymentType',
  //Валидация формы
  FORM_ERRORS_CHANGE = 'formErrors:change',
}
```



