# Проектная работа "Вебларек"

Стек: HTML, SCSS, TS, Webpack

#### Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

#### Важные файлы:

- src/pages/index.html — HTMLфайл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

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

# Документация

## Об архитектуре

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

## 1. Типы данных

Тип для получения ошибки валидации формы клиента

```
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
```

Тип для ограничения выбора значений платежного метода

```
export type PaymentMethod = 'online' | 'offline';
```

Тип вывода стоимости, для учета нулевой стоимости.

```
export type totalPrice = { total: number | null };
```

Тип принимает ограниченные значения соответствующие с названиями категорий товаров с сервера

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
Предполагается что данное свойство сообщает находится ли товар в корзине или нет (по умолчанию false).

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

Интерфейс объекта приходящего с сервера в ответ на запрос о получении всех товаров в магазине. Содержит в себе число всех товаров и массив товаров типа IProduct

```
export interface IProductList {
  total: number,
  items: IProduct[],
}
```

Интерфейс описывает модель продукта. Интерфейс содержит методы для получения/удаления данных типа IProduct, а также добавить товар в корзину посредствам установки свойства selected у товара в состояние true.

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
  //Очистить всю корзину
  removeAllProductsFromCart(): void,
}
```

Интерфейс описывает объект "Клиент". Данный объект хранит информацию введеную пользователем в момент оформления заказа.

```
export interface IOrderForm {
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
export interface ICartModel extends IOrderForm {
  //Суммарная стоимость выбранных продуктов
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


export interface IOrderBody extends IOrderForm, productsInCart, totalPrice { };


```

Интерфейс для подключения к API

```
export interface IWebLarekApi {
  //Получить товары
  getProductList(): Promise<IProductList>,
  //Получить товар по ID
  getProduct(id: string): Promise<IProduct>,
  //Метод отправки заказа от клиента на сервер
  postOrder(data: IOrderBody): Promise<IOrderResult>,
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

Тип для отображения карточки товара - полная версия в модальном окне

```
export type ProductFullView = {
  title: string,
  price: totalPrice,
  description: string,
  image: string,
  category: ProductCategory,
  addToCart?: HTMLButtonElement,
  removeFromCart?: HTMLButtonElement,
}
```

Тип отображения карточки товара - версия для каталога на главной странице

```
export type ProductCatalogView = Omit<ProductFullView, 'description' | 'removeFromCart' | 'addToCart'>;
```

Тип отображения карточки товара - версия для корзины

```
export type ProductCartView = Pick<ProductFullView, 'title' | 'price' | 'removeFromCart'> ;
```

Интерфейс события клика внутри карточки товара

```
interface IProductActions {
  onClick: (event: MouseEvent) => void;
}
```

Отображение главной страницы

```
export interface IPageView {
  //Массив карточек с товарами
  catalog: HTMLElement[];
  //Количество добавленных в корзину товаров
  cartCounter: number;
  //Состояние страницы для css класса page__wrapper_locked
  locked: boolean;
}
```

Отображение корзины

```
export interface ICartView {
  //Шаблон карточек товаров
  products: ProductCartView[];
  //Общая стоимость товаров
  total: totalPrice;
}
```




## Компоненты

### Базовый класс `Api`

Базовый класс для работы с API, реализует методы для выполнения HTTP-запросов к переданному базовому URL.

`constructor(baseUrl: string, options: RequestInit = {})`- принимает базовый URL и глобальные опции для всех запросов(опционально).

#### Методы:

- `handleResponse` - отрабатывает ответы от сервера, преобразуя их в json и управляя ошибками.
- `get` - выполняет GET запросы к предоставленному URL.
- `post` - выполняет запрос к API с использованием предоставленного метода(POST|PUT|DELETE) и предоставленными данными.

### Базовый класс `component`

Абстрактный класс для работы с DOM. Возвращает HTML элемент.

`protected constructor(protected readonly container: HTMLElement)`- принимает HTML элемент "контейнер" на основе которого будет сформирован компонент

#### Методы:

- `toggleClass(HTMLElement, string, boolean?)` добавление/удаление класса элементу по параметру типа boolean;

- `setText(HTMLElement, unknown)` устанавливает контент переданный вторым параметром метода, переданному вторым параметром, элементу. Предварительно контент приводится к типу `string`;

- `setDisabled(HTMLElement, boolean)` добавляет/убирает атрибут `disbled` переданному элементу;

- `setHidden(HTMLElement)` скрывает указанный элемент, устанавливая стиль `"display:none"`;

- `setVisible(HTMLElement)` отображает указанный элемент, удаляя стиль `"display:none"`;

- `setImage(HTMLImageElement, string, string?)` определяет переданому image-элементу свойство `src` и `alt` (опционально);

- `render(Partial<T>): HTMLElement` возвращает HTML компонент сформированный на основе переданного в конструктор класса HTML элемента. Атрибут данного метода определяется в дочерних классах.

### Базовый класс Model

Абстрактный класс для создания классов моделей данных на его основе.

`constructor(Partial<T>, protected events)`- конструктор принимает два аргумента в виде объектов.
Из первого объекта копирует свойства в экземпляр класса. Скопированные свойства не обязательные.
Второй аргумент конструктора - объект событий `IEvents` (описан далее).

#### Метод

- `emitChanges(string, object)`- Метод создает событие изменения данных в моделе.

### Базовый класс `EventEmitter`

Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события

```
constructor() {
  this._events = new Map<EventName, Set<Subscriber>>();
}
```

Создаёт массив типа "ключ-значения" где ключ - название события, а значение - функция событие. Данный **массив событий** хранится в свойстве класса `_events`.

Для работы класса необходимы следующие типы и интерфейсы:

- `EventName` - принимает тип "строка" или "регулярное выражение", хранит название название события;
- `Subscriber` - принимает тип "функция", хранит обработчик события;
- `EmitterEvent` - Интерфейс, описывающий массив `map` "название события" - "функция";
- `IEvents`- Интерфейс, определяющий класс `EventEmitter`.

#### Методы

- `on(EventName,callback): void`- Записывает в массив событий обработчик - callback по ключу указанному в EventName;
- `off(EventName,callback)`- Удаляет из массива событий обработчик с указанного события;
- `emit(eventName, data?)`- Инициирует событие, с возможностью передать обработчику события параметры при необходимости;
- `onAll(callback: (event: EmitterEvent) => void)` Устанавливает один обработчик на все события;
- `offAll()` Удаляет все обработчики событий переопределяет свойство `_events` пустым массивом событий и их обработчиков.
- `trigger<T extends object>(eventName: string, context?: Partial<T>)`- Создает триггер для указанного события.

### Класс WebLarekApi 
Класс наследуется от базового класса `Api`, реализует необходимые методы через интерфейс `IWebLarekApi` для подключения к серверу приложения.

`constructor(string, RequestInit?)`- Принимает базовый `URL` описаный в файле `./src/utils/constants.ts` и параметры запроса (необязательно) для настройки запросов к серверу.

#### Методы

- `getProducts(): Promise<IItemList>`- Отправляет запрос на сервер, возвращает список товаров в формате `IProductList`;
- `getProduct(string): Promise<IItem>` Принимает индификатор товара в качестве аргемента и отпровляет запрос на сервер, для получения информации о конкретном товаре по его идентификатору. Возвращает информацию о товаре в формате `IPtoduct`;
- sendOrder(IOrder): Promise<IOrderResult> Отправляет `POST` запрос на сервер для создания заказа. Принимает данные заказа в формате IOrder. Возвращает результат создания заказа в формате IOrderResult;



## Классы Model

## Классы View

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
