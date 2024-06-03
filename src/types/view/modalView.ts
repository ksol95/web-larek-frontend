//Модальное окно
export interface IModal {
	open(): void;
	close(): void;
	loadContent(content: HTMLElement): void;
}
