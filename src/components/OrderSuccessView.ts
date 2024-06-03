import { Component } from './base/component';
import { ensureElement } from '../utils/utils';
import { IOrderResult, IOrderResultActions } from '../types';
import { settings } from '../utils/constants';

const selector = settings.orderSuccessTemplate;
const text = settings.text;

export class OrderSuccess extends Component<IOrderResult> {
	protected _title: HTMLElement;
	protected _description: HTMLElement;
	protected _buttonClose: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IOrderResultActions) {
		super(container);

		this._title = ensureElement<HTMLElement>(selector.title, this.container);
		this._description = ensureElement<HTMLElement>(
			selector.description,
			this.container
		);
		this._buttonClose = ensureElement<HTMLButtonElement>(
			selector.button,
			this.container
		);

		if (actions?.onClick) {
			this._buttonClose.addEventListener('click', actions.onClick);
		}
	}

	set total(total: number) {
		this.setText(
			this._description, `
				${text.success} ${total.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ${text.currency}
			`);
	}
}
