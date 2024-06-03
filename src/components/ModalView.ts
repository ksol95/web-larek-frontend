import { Component } from './base/component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { eventList, settings } from '../utils/constants';

const selector = settings.modalTemplateSelectors;

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			selector.closeBtn,
			container
		);
		this._content = ensureElement<HTMLElement>(selector.content, this.container);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add(selector.open);
		this.events.emit(eventList.MODAL_OPEN);
	}

	close() {
		this.container.classList.remove(selector.open);
		this.content = null;
		this.events.emit(eventList.MODAL_CLOSE);
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
