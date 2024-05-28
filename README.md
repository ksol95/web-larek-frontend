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

Список всех модальных окон
```
export enum AppStateModals {
  product, //Окно с описанием продукта
  cart, //Окно корзины
  orderPay, //Окно с вводом адреса и выбором метода оплаты
  orderClient, //Окно с формой ввода контактной информации клиента
  orderSuccess, //Окно вывода сообщения с результатом заказа 
}
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
Тип для ограничения значений валюты
```
export type Currency = 'синапсов' | 'рублей';
```
Тип для ограничения значений способов оплаты
```
export type PaymentMethod = 'online' | 'offline';
```
Интерфейс объекта "Товар" содержит в себе все поля приходящих с сервера и дополнительное свойство "inCart" типа boolean.
Предпологается что даное свойство сообщает находится ли товар в корзине или нет (по умолчанию false).
```
export interface IProduct {
  id: string,
  description: string,
  image: string,
  title: string,
  category: ProductCategory,
  price: number | null,
  inCart?: boolean, //Добавлен ли товар в корзину
}
```
Интерфейс объекта приходящего с сервара в ответ на запрос о получении всех товаров в магазине. Содержит в себе число всех товаров и массив товаров типа IProduct
```
export interface IProductList {
  total: number,
  items: IProduct[],
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
Тип для получения ошибки валидации формы клиента
```
export type FormErrors = Partial<Record<keyof IClientForm, string>>;
```
Тип описывает объект который хранит в себе ответ от сервера после отправки заказа.
```
export interface IOrderResult {
  id: string,
  total: number,
  error?: string,
}
```

## 2. Модели данных

Были выделены три интерфейса моделей данных:
  1. Продукт - интерфейс расширяет IProductList методами необходимыми для работы с данными товара.
  ```
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
  ```
  2. Клиент - интерфейс расширяет IClientForm методами необходимыми для работы с данными клиента в том числе отправки заказа.
  ```
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
  ```
  3. Приложение - интерфейс модели данных основного приложения содержит в себе селекторы для отображение списка товаров, "запоминия" ID откытого в модальном окне товара, список всех модальных окон и ссыдку на открытое окно.
  ```
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
  ```
  

## 3. Описание событий

События хранятся в объекте - "eventsList" по пути "./utils/constants.ts".
```
export const eventsList = {
  //События открытия и закрытия модальных окон
  ['MODAL_OPEN']: 'modal:open',
  ['MODAL_CLOSE']: 'modal:close',

  //Изменение статуса "в корзине"
  ['PRODUCT_CHANGE']: 'product:change',
  //Открыть модальное окно с подробным описанием товара
  ['PRODUCT_OPEN']: 'product:open',

  //Событие открытия окна с корзиной
  ['CART_OPEN']: 'cart:open',

  //Открыть модальное окно с формой данных о клиенте
  ['CLIENT_OPEN']: 'client:open',
  //Отправка формы заказа
  ['CLIENT_SUBMIT']: 'client:submit',
  //Выбор типа оплаты
  ['CLIENT_PAYMENT_TYPE']: 'client:changePaymentType',
  //Валидация формы

  ['FORM_ERRORS_CHANGE']: 'formErrors:change',
}
```



