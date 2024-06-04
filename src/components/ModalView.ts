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
	opening = false;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			selector.closeBtn,
			container
		);
		this._content = ensureElement<HTMLElement>(selector.content, this.container);

		this._closeButton.addEventListener('click', () => this.close.bind(this));

		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.opening = true;
		this.toggleClass(this.container, selector.activeModal);
		this.events.emit(eventList.MODAL_OPEN_CLOSE);
	}

	close() {
		this.opening = false;
		this.toggleClass(this.container, selector.activeModal);
		this.content = null;
		this.events.emit(eventList.MODAL_OPEN_CLOSE);
	}

	render(data: IModalData): HTMLElement {
		if (this.opening) this.close()

		super.render(data);
		this.open();
		return this.container;
	}
}
