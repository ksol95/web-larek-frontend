//Отображение главной страницы
export interface IPageView {
	//Массив карточек с товарами
	catalog: HTMLElement[];
	//Количество добавленых в корзину товаров
	cartCounter: number;
	//Состояние страницы для css класса page__wrapper_locked
	locked: boolean;
}
