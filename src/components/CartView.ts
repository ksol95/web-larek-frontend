import { Component } from './base/component';
import { createElement, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { ICartView } from '../types/view/cartView';
import { eventList, settings } from '../utils/constants';

const selector = settings.cartTemplateSelectors;
const text = settings.text;

export class Cart extends Component<ICartView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._list = ensureElement(selector.list, this.container);
		this._total = ensureElement(selector.price, this.container);
		this._button = ensureElement<HTMLButtonElement>(
			selector.action,
			this.container
		);

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit(eventList.CART_ORDER);
			});
		}

		this.products = [];
	}

	set products(product: HTMLElement[]) {
		//Проверяем количество добавленых элементов(Товаров) в список корзины
		if (product.length) {
			//Выводим товары в список если элементы пришли
			//и включаем кнопку "Оформить заказ"
			this._list.replaceChildren(...product);
			this.toggleButton(false);
		} else {
			//Иначе, отключаем кнопку "Оформить заказ"
			this.toggleButton(true);
			//Рисуем текст пустой корзины в списке товаров
			this._list.replaceChildren(
				createElement<HTMLLIElement>('li', {
					classList: selector.emptyStyle,
					textContent: text.cartEmpty,
				})
			);
		}
	}

	set total(total: number) {
		this.setText(this._total, `
			${total.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ${text.currency}
		`);
	}

	toggleButton(state: boolean) {
		this.setDisabled(this._button, state);
	}
}
