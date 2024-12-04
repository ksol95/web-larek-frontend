# Проектная работа "Вебларек"

Стек: HTML, SCSS, TS, Webpack

[Ссылка на проект](https://ksol95.github.io/web-larek-frontend/)

#### Структура проекта:

- `src/` — исходные файлы проекта;
- `src/Components/` — папка с JS компонентами;
- `src/Components/base/` — папка с базовым кодом.

#### Важные файлы:

- `src/pages/index.html` — HTML файл главной страницы;
- `src/types/index.ts` — файл с типами;
- `src/types/view/` — Типы представления;
- `src/index.ts` — точка входа приложения;
- `src/scss/styles.scss` — корневой файл стилей;
- `src/utils/constants.ts` — файл с константами;
- `src/utils/utils.ts` — файл с утилитами.

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

Взаимодействия внутри приложения происходят через события. Компоненты инициализируют события, которые выполняются в основном коде, выполняя обработку данных и их передачу между компонентам отображения. Также события отслеживают изменения данных в главной модели приложения.

## 1. Основные типы данных

#### Интерфейс описывает товар

```
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductCategory;
  price: number | null;
}
```

#### Массив товаров приходящий с сервера

```
export interface IProductList {
  total: number;
  items: IProduct[];
}
```

#### Интерфейс модели данных всего приложения

```
export interface IAppModel {
  order: IOrderForm | null;
  contacts: IContactsForm | null;
  products: IProduct[];
  cart: string[];
  // Получить товары
  setProducts(products: IProduct[]): void;
  //Вывести товары
  getProducts(): IProduct[];
  //Добавить товар в корзину
  addToCart(id: string): void;
  //Убрать товар из корзины
  removeProductFromCart(id: string): void;
  //Получить товары из корзины
  getCart(): void;
  //Получить суммарную стоимость товаров в корзине
  getTotalPrice(): number;
  //Получить количество товаров в корзине
  getCountCart(): number;
  //Получить количество товаров в моделе
  getProductsCount(): number;
  //Очистить всю корзину
  removeAllProductsFromCart(): void;
}
```

#### Интерфейс для подключения к API

```
export interface IWebLarekApi {
  //Получить товары
  getProductList(): Promise<IProductList>;
  //Получить товар по ID
  getProduct(id: string): Promise<IProduct>;
  //Метод отправки заказа от клиента на сервер
  postOrder(data: IOrderBody): Promise<IOrderResult>;
}
```

#### Интерфейс для получения результатов заказа

```
export interface IOrderResult {
  id?: string;
  total: totalPrice;
  error?: string;
}
```

#### Объект для отправки заказа

```
export interface IOrderBody extends totalPrice {
  payment: string;
  address: string;
  email: string;
  phone: string;
  items: string[];
}
```

#### Тип totalPrice используется внутри других интерфейсов

```
export type totalPrice = { total: number | null };
```

#### Тип принимает ограниченные значения соответствующие с названиями категорий товаров с сервера

```
export type ProductCategory =
  | 'софт-скил'
  | 'хард-скил'
  | 'другое'
  | 'дополнительное'
  | 'кнопка';
```

#### Интерфейс для отображения карточки товара

```
export type ProductView = {
  id: string;


  title: string;
  price: string;
  image: string;


  description: string | string[];
  category: ProductCategory;


  inCart: boolean;
  inMarket: boolean;
  index: number;
};


export interface IProductActions {
  onClick: (event: MouseEvent) => void;
}
```

#### Интерфейс для отображения главной страницы

```
export interface IPageView {
  //Массив карточек с товарами
  catalog: HTMLElement[];
  //Количество добавленных в корзину товаров
  cartCounter: number;
}
```

#### Интерфейс для модельного окна

```
export interface IModalData {
	content: HTMLElement;
}
```

#### Отображение корзины

```
export interface ICartView {
  products: HTMLElement[];
  total: number;
  selected: string[];
}
```

#### Интерфейсы необходимые для работы форм

```
export type paymentMethod = "card" | "online"

export interface IOrderForm {
  payment: paymentMethod;
  address: string;
}


export interface IContactsForm {
  email: string;
  phone: string;
}


export interface IFormState {
  valid: boolean;
  errors: string[];
}

export type PaymentType = {
	type: string;
}
```

## Компоненты

## Базовый класс `Api`

Базовый класс для работы с API, реализует методы для выполнения HTTP-запросов к переданному базовому URL.

`constructor(baseUrl: string, options: RequestInit = {})`- принимает базовый URL и глобальные опции для всех запросов(опционально).

#### Методы:

- `handleResponse` - отрабатывает ответы от сервера, преобразуя их в json и управляя ошибками.
- `get` - выполняет GET запросы к предоставленному URL.
- `post` - выполняет запрос к API с использованием предоставленного метода(POST|PUT|DELETE) и предоставленными данными.

### Базовый класс `Component`

Абстрактный класс для создания объектов представления. Возвращает HTML элемент.

`protected constructor(protected readonly container: HTMLElement)`- принимает HTML элемент "контейнер" на основе которого будет сформирован компонент

#### Методы:

- `toggleClass(HTMLElement, string, boolean?)` добавление/удаление класса элементу по параметру типа boolean;
- `setText(HTMLElement, unknown)`- устанавливает контент переданный вторым параметром метода, переданному вторым параметром, элементу. Предварительно контент приводится к типу `string`;
- `setDisabled(HTMLElement, boolean)`- добавляет/убирает атрибут `disabled` переданному элементу;
- `setHidden(HTMLElement)`- скрывает указанный элемент, устанавливая стиль `"display:none"`;
- `setVisible(HTMLElement)`- отображает указанный элемент, удаляя стиль `"display:none"`;
- `setImage(HTMLImageElement, string, string?)`- определяет переданому image-элементу свойство `src` и `alt` (опционально);
- `render(Partial<T>): HTMLElement`- возвращает HTML элемент сформированный на основе переданного в конструктор класса HTML элемента (шаблона). Атрибут метода принимает данные которые будут содержаться в готовом элементе.

## Базовый класс `LocStorage`

Класс содержит только статичные методы для работы с `LocalStorage`.

#### Методы:

- `static update(key: string, data: string[] | string)` - Обновляет/заменяет значение указаного ключа `key` на новое значенине, переданое методу параметром `data`;
- `static append(key: string, data: string[] | string)` - Добавляет новое значение к предыдущему;
- `static get(key: string)` - Возвращает массив строк значений указаного ключа;
- `static removeItem(key: string, value: string)` - Удаляет указаное значение из ключа `key`, по значению указаному в качестве параметра `value`;
- `static clear()` - Очищает весь LocalStorage.

Методы даного класса используются для сохранения состояния корзины товаров, даже после перезагрузки страницы. Так же есть возможность при необходимости сохранить/удалить/заменить любые другие данные из LocalStorage в дальнейшем.

## Базовый класс `Model`

Абстрактный класс для создания классов моделей данных на его основе.

`constructor(Partial<T>, protected events)`- конструктор принимает два аргумента в виде объектов.
Из первого объекта копирует свойства в экземпляр класса. Скопированные свойства не обязательные.
Второй аргумент конструктора - объект событий `IEvents` (описан далее).

#### Метод:

- `emitChanges(string, object)`- Метод создает событие изменения данных в моделе.

## Базовый класс `EventEmitter`

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

#### Методы:

- `on(EventName,callback): void`- Записывает в массив событий обработчик - callback по ключу указанному в EventName;
- `off(EventName,callback)`- Удаляет из массива событий обработчик с указанного события;
- `emit(eventName, data?)`- Инициирует событие, с возможностью передать обработчику события параметры при необходимости;
- `onAll(callback: (event: EmitterEvent) => void)` Устанавливает один обработчик на все события;
- `offAll()` Удаляет все обработчики событий переопределяет свойство `_events` пустым массивом событий и их обработчиков.
- `trigger<T extends object>(eventName: string, context?: Partial<T>)`- Создает триггер для указанного события.

## Класс `WebLarekApi`

Класс наследуется от базового класса `Api`, реализует необходимые методы через интерфейс `IWebLarekApi` для подключения к серверу приложения.

`constructor(string, RequestInit?)`- Принимает базовый `URL` описанный в файле `./src/utils/constants.ts` и параметры запроса (необязательно) для настройки запросов к серверу.

#### Методы:

- `getProducts(): Promise<IProductList>`- Отправляет запрос на сервер, возвращает список товаров в формате `IProductList`;
- `getProduct(string): Promise<IProduct>` Принимает идентификатор товара в качестве аргумента и отправляет запрос на сервер, для получения информации о конкретном товаре по его идентификатору. Возвращает информацию о товаре в формате `IPtoduct`;
- `sendOrder(IOrder): Promise<IOrderResult>` Отправляет `POST` запрос на сервер для создания заказа. Принимает данные заказа в формате `IOrder`. Возвращает результат создания заказа в формате `IOrderResult`;

## Модель данных

## Класс `AppSModel`

Класс наследуется от базового класса `Model`. Является общей моделью данных всего приложения. Изменения данных внутри модели генерируют события с помощью метода `emitChanges` родительского класса `Model`, имплементирует интерфейс `IAppModel`.

#### Свойства

- `cart: string[] = []`- Массив ID товаров добавленных в корзину;
- `products: IProduct[] = []`- Каталог товаров;
- `order: IOrderForm`- Информация из формы ввода адреса и выбора способа оплаты;
- `contacts: IContactsForm`- Информация из формы ввода номера телефона и email;

#### Методы

- `setProducts(IProduct[])`- Записывает товары;
- `getProducts()`- Возвращает массив товаров;
- `addToCart(string)`- Добавить товар в корзину по ID;
- `removeProductFromCart(string)`- Удаляет товар по ID;
- `getCart()`- Возвращает товары из корзины в виде массива объектов;
- `getTotalPrice()`- Возвращает суммарную стоимость товаров добавленных в корзину;
- `getProductsCount()`- Возвращает общее количество товаров;
- `getCountCart()`- Возвращает количество товаров в корзине;
- `removeAllProductsFromCart()`- Очищает корзину.

## Классы "представления" приложения

## Класс `MainPage`

Класс наследуется от базового класса `Component`, описывает представление главной страницы.

`constructor(HTMLElement, IEvents)`- Конструктор класса, принимающий контейнерный элемент страницы и объект событий. Вызывает конструктор родительского класса `Component` и инициализирует элементы страницы.

#### Свойства

- `#_counter: HTMLElement`- счётчик корзины;
- `#_catalog HTMLElement`- контейнер для отображения карточек товара;
- `#_wrapper HTMLElement`- элемент обёртки;
- `#_cartButton HTMLElement`- элемент кнопки открытия корзины;

#### Методы

- `set counter`- устанавливает счётчик товаров в корзине;
- `set catalog`- выводит в контейнер `_catalog` список товаров;
- `set locked`- блокирует/разблокирует прокрутку страницы по средствам установки специального класса элементу `_wrapper`;

## Класс `ProductCard`

Класс `ProductCard` наследуется от базового класса `Component`, передавая родительскому классу в дженерик тип `ProductView`. Формирует представление товара.
Для обработки событий внутри карточки товара (представлении) используется интерфейс `IProductActions: onClick: (event: MouseEvent): void`.

`constructor( HTMELement, IProductActions?)`- Конструктор получает два параметра: HTML-шаблон (container) и функцию, которая будет установлена на событие 'click' по кнопке внутри представления.
Конструктор родительского класса `Component` формирует объект `this.container` на основе полученного HTML-шаблона, далее инициализирует свойства класса.

#### Свойства:

Свойства класса содержат в себе DOM узлы из переданного HTML-шаблона.

##### Общие, для всех шаблонов карточек, свойства

- `#_title`- HTMLElement с селектором '.card\_\_title';
- `#_price`- HTMLElement с селектором '.card\_\_price';

##### Не отображается только в каталоге

- `#_button`- HTMLButtonElement с селектором '.card\_\_button';

##### Не отображается в корзине

- `#_category`- HTMLElement с селектором '.card\_\_category';
- `#_description`- HTMLElement с селекторм '.card\_\_text';
- `#_image`- HTMLElement с селектором '.card\_\_button';

##### Отображается только в корзине

- `#_index`- HTMLElement с селектором '.basket\_\_item-index', используется только с шаблоном карточки товара в корзине;

#### Геттеры и Сеттеры:

- `set/get id`;
- `set/get title`;
- `set/get image`;
- `set description`;
- `set inMarket` - В случае если устанавливается значение `true`, запускается метод `offTheMarket`;
- `set inCart(boolean)` - Устанавливается текст на кнопке в модальном окне товара, Удалить/Добавить товар в корзину;
- `set/get price` - В случае отсутствия цены (NULL) необходимо вывести слово "Бесценно";
- `set/get category` - Данный метод подставляет класс модификатор элементу `_category` соответствующий его значению;

#### Метод

- `offTheMarket` - Метод отключает кнопку "Купить" и устанавливает на ней текст "Недоступно", необходимо для товаров без стоимости;

## Класс `Modal`

Класс `Modal` расширяет базовый класс `Component`, являясь представлением модального окна.

`constructor(HTMElement, IEvents)`- Вызывает конструктор родительского класса `Component` и инициализирует элементы модального окна. Устанавливает обработчики событий для кнопки закрытия, самого модального окна и его содержимого.

#### Свойства:

- `#_closeButton: HTMLButtonElement`- кнопка закрытия модального окна;
- `#_content: HTMLElement`- содержимое модального окна;
- `opening: boolean` - состояния открыто\закрыто модального окна.

#### Методы

- `set content(HTMLElement)`- устанавливает содержимое модального окна;
- `#escHandle = (event: KeyboardEvent)` - Обработчик события нажатия клавиши `Esc`, вызывает метод `close()`;
- `open()`- Открывает модальное окно, добавляя ему класс `modal_active` и инициирует событие `modal:open`, а также устанавливает слушатель события `keydown` на весь документ, с обработчиком события `escHandle`;
- `close()`- Закрывает модальное окно, удаляя у него класс `modal_active`, очищает содержимое и инициирует событие `"modal:close"`, а так же удаляет слушатель события `keydown`;
- `render()`- Переопределенный родительский метод отрисовки модального окна. Вызывает метод `open()` после отрисовки.

## Класс `Cart`

Класс `Cart` расширяет базовый класс `Component`. Описывает представление корзины товаров.

`constructor(HTMElement, IEvents)`- Вызывает конструктор родительского класса `Component` и инициализирует элементы шаблона корзины товаров. Устанавливает обработчик события для кнопки оформления заказа.

### Свойства:

- `#_list: HTMElement`- Элемент списка товаров в корзине.
- `#_total: HTMLElement`- Элемент отображения общей суммы заказа.
- `#_button: HTMLElelemnt`- Кнопка оформления заказа.

### Методы:

- `set products(HTMLElement[])`- Добавляет товары в список корзины. При пустом списке товаров, выводит соответствующее сообщение;
- `set total(number)`- Устанавливает общую сумму заказа.

## Класс `Form`

Класс `Form` Расширяет базовый класс `Component`. Описывает представление форм в приложении.

`constructor(HTMLFormElement, IEvents)`- Вызывает конструктор родительского класса `Component` и инициализирует элементы формы. Устанавливает обработчики событий для ввода данных и отправки формы.

#### Свойства:

- `#_submit: HTMLButtonElement`- Кнопка отправки формы.
- `#_errors: HTMLElement`- Элемент для отображения ошибок формы.

#### Методы:

- `onInputChange(keyof T, string)`- Обрабатывает изменения в полях ввода формы и генерирует событие с информацией о измененном поле и его значении.
- `set valid(boolean)`- блокирует/разблокирует кнопку отправки
- `set errors(string)`- устанавливает ошибку в элемент ошибки
- `render(Partial<T> & IFormState)`- Метод для рендеринга формы. Вызывает родительский метод render для установки состояния формы, а затем применяет значения состояния к элементам формы.

## Класс `OrderForm`

Класс `OrderForm` Расширяет класс `Form`. Описывает представление формы ввода адреса и выбора метода оплаты.

`constructor(HTMLFormElement, IEvents)`- Вызывает конструктор родительского класса `Form`, передавая ему форму и объект событий, а также инициализирует кнопки выбора метода оплаты.

#### Свойства

-`#_paymentButton`- Массив кнопок выбора способа оплаты. -`inputs: IOrderForm` - Объект со значениями введенных в форму; -`formErrors: OrderFormErrors` - Объект с сообщениями об ошибках валидации полей формы;

#### Методы:

- `set address(string)`;
- `set payment(string)`;
- `#paymentChoice(HTMLButtonElement)` - Устанавливает выбранный метод оплаты;
- `setOrderField(keyof IOrderForm, string)` - Устанавливает значения полей проверяя их на валидность, в случае если форма валидна, инициализирует событие "ORDER_READY";
- `validateOrder()` - Метод валидации полей формы.

## Класс `ContactsForm`

Класс `ContactsForm` Расширяет класс `Form`. Описывает представление формы ввода номпера телефона и email пользователя.

`constructor(HTMLFormElement, IEvents)`- Вызывает конструктор родительского класса `Form`, передавая ему форму и объект событий.

#### Свойства

-`#_paymentButton`- Массив кнопок выбора способа оплаты. -`inputs: IContactsForm` - Объект со значениями введенных в форму; -`formErrors: ContactsFormErrors` - Объект с сообщениями об ошибках валидации полей формы;

#### Методы:

- `set phone(string)`;
- `set email(string)`;
- `#paymentChoice(HTMLButtonElement)` - Устанавливает выбранный метод оплаты;
- `setContactsField(keyof IContactsForm, string)` - Устанавливает значения полей проверяя их на валидность, в случае если форма валидна, инициализирует событие "CONTACTS_READY";
- `validateContacts()` - Метод валидации полей формы.

## Класс `OrderSuccess`

Класс `OrderSuccess` расширяет класс `Component`. Реализует представление успещного выполнения отправки заказа на сервер.

#### Свойства:

- `_title:`- HTMLElement Заголовок;
- `_description:`- HTMLElement Текст из шаблона представления выводящий сообщения об оплате;
- `_buttonClose:`- HTMLButtonElement Кнопка из шаблона представления.

### Метод

- `set total(number)`- Заполняет сообщение в элементе \_description сообщением об успешном заказе и общей сумме заказа.

## 4. Описание событий

События хранятся в объекте - "eventList" описаном в файле "./utils/constants.ts".

```
export const eventList = {
  //Изменение в списке продуктов
  MODEL_CHANGE: 'product:change',
  //Открыть превью товара
  PRODUCT_PREVIEW: 'prduct:preview',
  //Добавление в корзину
  PRODUCT_ADD: 'prduct:addToCart',
  //Удаление из корзины
  PRODUCT_REMOVE: 'prduct:removeFromCart',
  //Очистить всю корзину
  PRODUCT_REMOVE_ALL: 'prduct:removeAllFromCart',


  //Событие открытия окна с корзиной
  CART_OPEN: 'cart:open',
  //Оформление заказа
  CART_ORDER: 'cart:order',
  //Изменения корзины
  CART_CHANGE: 'cart:change',


  //Выбор типа оплаты
  ORDER_PAYMENT_TYPE: 'order:changePaymentType',
  //Изменение в инпуте "адрес"
  ORDER_INPUTS_CHANGE: /^order\..*:change/,
  //Ошибка формы заказа
  ORDER_ERROR: 'orderFormErrors:change',
  //Форма заказа без ошибок
  ORDER_READY: 'orderFormErrors:ready',
  //Отправка формы ORDER
  ORDER_SUBMIT: 'order:submit',


  //Изменение в инпуте "адрес"
  CONTACTS_INPUTS_CHANGE: /^contacts\..*:change/,
  //Ошибка формы контактов
  CONTACTS_ERROR: 'contactsFormErrors:change',
  //Форма контакты без ошибок
  CONTACTS_READY: 'contactsFormErrors:ready',
  //Отправка формы ORDER
  CONTACTS_SUBMIT: 'contacts:submit',

	//Открытие/закрытие любого модельного окна
	MODAL_OPEN_CLOSE: 'modal:open/close',
}
```
