import {
	IOrderForm,
	IContactsForm,
	IFormState,
	PaymentType,
	paymentMethod,
} from '../types/view/formsView';
import { Component } from './base/component';
import { IEvents } from './base/events';
import { eventList, settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { OrderFormErrors, ContactsFormErrors } from '../types';

const selectorOrder = settings.orderForm;
const selectorContacts = settings.contactsForm;
const text = settings.text;

export class Form<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>(settings.formErr, this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this.setDisabled(this._submit, !value);
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}

export class OrderForm extends Form<IOrderForm> {
	protected _paymentButtons: HTMLButtonElement[];
	inputs: IOrderForm = {
		payment: <paymentMethod>settings.paymentMethods_default,
		address: '',
	};
	formErrors: OrderFormErrors = {};

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		//Получаем массив кнопок заказа
		this._paymentButtons = Array.from(
			this.container.querySelectorAll(selectorOrder.paymentButtons)
		) as HTMLButtonElement[];
		if (this._paymentButtons.length) {
			//Если кнопки есть, то вешаем на них событие клика
			//Делаем так, что бы одновремено была активнат только одна кнопка
			this._paymentButtons.forEach((button) => {
				button.addEventListener('click', () => {
					this.events.emit(eventList.ORDER_PAYMENT_TYPE, <PaymentType>{
						type: this.paymentChoice(button),
					});
				});
			});
		}
	}

	set address(value: string) {
		(
			this.container.elements.namedItem(
				selectorOrder.inputAddress
			) as HTMLInputElement
		).value = value;
	}

	set payment(method: string) {
		this._paymentButtons.forEach((button) => {
			this.toggleClass(button, selectorOrder.paymentBtnActive, false);
		});
		this.toggleClass(
			this._paymentButtons.find((button) => button.name === method),
			selectorOrder.paymentBtnActive,
			true
		);
	}

	protected paymentChoice(button: HTMLButtonElement): string {
		//Снимаем со всех кнопок active
		this._paymentButtons.forEach((button) => {
			this.toggleClass(button, selectorOrder.paymentBtnActive, false);
		});
		//Ставим active на кнопку по которой произвели клик
		this.toggleClass(button, selectorOrder.paymentBtnActive, true);
		//Запоминаем выбраный метод оплаты
		return <string>button.name;
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		if (field != 'payment') {
			this.inputs[field] = value;
			if (this.validateOrder()) {
				this.events.emit(eventList.ORDER_READY, this.inputs);
			}
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.inputs.address) {
			errors.address = text.err.emptyAddress;
		}
		this.formErrors = errors;
		this.events.emit(eventList.ORDER_ERROR, this.formErrors);
		return Object.keys(errors).length === 0;
	}
}

export class ContactsForm extends Form<IContactsForm> {
	protected _paymentButton: HTMLButtonElement[];
	inputs: IContactsForm = {
		phone: '',
		email: '',
	};
	formErrors: ContactsFormErrors = {};

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(
			this.container.elements.namedItem(
				selectorContacts.inputPhone
			) as HTMLInputElement
		).value = value;
	}

	set email(value: string) {
		(
			this.container.elements.namedItem(
				selectorContacts.inputEmail
			) as HTMLInputElement
		).value = value;
	}

	setContactsField(field: keyof IContactsForm, value: string) {
		this.inputs[field] = value;

		if (this.validateContacts()) {
			this.events.emit(eventList.CONTACTS_READY, this.inputs);
		}
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.inputs.phone) {
			errors.phone = text.err.emptyPhone;
		}
		if (!this.inputs.email) {
			errors.phone = text.err.emptyEmail;
		}
		this.formErrors = errors;
		this.events.emit(eventList.CONTACTS_ERROR, this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
