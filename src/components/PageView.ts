import { Component } from './base/component';
import { IEvents } from './base/events';
import { eventList, settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IPageView } from '../types/view/pageView';

const selector = settings.pageTemplateSelectors;

export class MainPage extends Component<IPageView> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _cartButton: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement(selector.counter);
		this._catalog = ensureElement(selector.catalog);
		this._wrapper = ensureElement(selector.wrapper);
		this._cartButton = ensureElement(selector.cart);

		this._cartButton.addEventListener('click', () => {
			//Событие клика по кнопке корзины
			this.events.emit(eventList.CART_OPEN);
		});
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set catalog(products: HTMLElement[]) {
		this._catalog.replaceChildren(...products);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add(settings.pageLockedClass);
		} else {
			this._wrapper.classList.remove(settings.pageLockedClass);
		}
	}
}