import { IProductActions, ProductView } from '../types/view/productView';
import { ProductCategory } from '../types';
import { ensureElement } from '../utils/utils';
import { settings } from '../utils/constants';
import { Component } from './base/component';

const selector = settings.productCardTemplateSelectors;
const text = settings.text;

export class ProductCard extends Component<ProductView> implements ProductView {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions?: IProductActions) {
		super(container);

		this._title = ensureElement(selector.title, this.container);
		this._price = ensureElement(selector.price, this.container);

		this._image = this.container.querySelector(selector.image);
		this._category = this.container.querySelector(selector.category);
		this._description = this.container.querySelector(selector.description);
		this._index = this.container.querySelector(selector.cart);
		this._button = this.container.querySelector<HTMLButtonElement>(
			selector.button
		);
		//Добовляем событие клика на кнопку в карточке товара, или на саму карточку
		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set category(value: ProductCategory) {
		if (this._category) {
			this.setText(this._category, value);
			//Обнуляем классы модификаторы в шаблоне
			this._category.className = selector.category.replace(/./, '');
			//Добавляем класс модификатор соответствующий имени категории (constans.ts -> settings -> сategoryType)
			this._category.classList.add(
				`${settings.categoryClass}${settings.сategoryType[value]}`
			);
		}
	}

	get category(): ProductCategory {
		return this._category.textContent as ProductCategory;
	}

	set price(value: string) {
		this.setText(
			this._price, value === '' ? text.nullPrice : `
				${value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ${text.currency}
			`);
	}

	get price(): string {
		return this._price.textContent || null;
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._description.replaceWith(
				...value.map((str) => {
					const descTemplate = this._description.cloneNode() as HTMLElement;
					this.setText(descTemplate, str);
					return descTemplate;
				})
			);
		} else {
			this.setText(this._description, value);
		}
	}
	
	set inMarket(status: boolean) {
		if (status) this.offTheMarket();
	}

	set inCart(status: boolean) {
		this.setText(
			this._button,
			status ? text.deleteFromCart_btn : text.addToCart_btn
		);
		// this._button.disabled = status;
	}

	set index(value: number) {
		this.setText(this._index, value.toString());
	}
	offTheMarket(): void {
		this.setText(this._button, text.offTheMarket);
		this._button.disabled = true;
	}

}
