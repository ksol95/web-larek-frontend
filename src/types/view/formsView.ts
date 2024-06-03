// import { PaymentMethod } from '../';

export interface IOrderForm {
	payment: string;
	address: string;
}
// export interface IOrder extends IOrderForm {
//   items: string[]
// }

export interface IContactsForm {
	email: string;
	phone: string;
}
// export interface IContacts extends IContactsForm {
//   items: string[]
// }

export interface IFormState {
	valid: boolean;
	errors: string[];
}
