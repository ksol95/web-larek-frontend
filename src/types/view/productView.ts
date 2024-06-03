import { ProductCategory } from '../';
//Тип для отображения карточки товара
export type ProductView = {
	id: string;

	title: string;
	price: string;
	image: string;

	description: string | string[];
	category: ProductCategory;

	inCart: boolean;
	inMarket: boolean;
	index: number;
};
export interface IProductActions {
	onClick: (event: MouseEvent) => void;
}
