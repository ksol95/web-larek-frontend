export interface IOrderForm {
	payment: string;
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
