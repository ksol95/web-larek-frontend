import { IOrderForm, IContactsForm } from './view/formsView';

export type OrderFormErrors = Partial<Record<keyof IOrderForm, string>>;
export type ContactsFormErrors = Partial<Record<keyof IContactsForm, string>>;
export type totalPrice = { total: number | null };

//Тип принимает ограниченые значения соответсвующие с названиями категорий товаров с сервера
export type ProductCategory =
	| 'софт-скил'
	| 'хард-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка';

//Интерфейс описывает товар
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: ProductCategory;
	price: number | null;
}
//Массив товаров приходящий с сервера
export interface IProductList {
	total: number;
	items: IProduct[];
}
//Интерфейс модели данных всего приложения
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
	//Получить суммарную стоиомсть товаров в корзине
	getTotalPrice(): number;
	//Получить количество товаров в корзине
	getCountCart(): number;
	//Получить количество товаров в моделе
	getProductsCount(): number;
	//Очистить всю корзину
	removeAllProductsFromCart(): void;
}

export interface IOrderResult {
	id?: string;
	total: totalPrice;
	error?: string;
}

export interface IOrderResultActions {
	onClick: () => void;
}

//Объект для отправки заказа
export interface IOrderBody extends totalPrice {
	payment: string;
	address: string;
	email: string;
	phone: string;
	items: string[];
}

//Интерфейс для подключения к API
export interface IWebLarekApi {
	//Получить товары
	getProductList(): Promise<IProductList>;
	//Получить товар по ID
	getProduct(id: string): Promise<IProduct>;
	//Метод отправки заказа от клиента на сервер
	postOrder(data: IOrderBody): Promise<IOrderResult>;
}
