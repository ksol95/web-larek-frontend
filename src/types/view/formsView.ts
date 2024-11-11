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
export type paymentMethod = "card" | "online";

export type PaymentType = {
	type: paymentMethod;
}