//Отображение главной страницы
export interface IPageView {
	//Массив карточек с товарами
	catalog: HTMLElement[];
	//Количество добавленых в корзину товаров
	cartCounter: number;
}
