import { Currency, ProductCategory } from '..'
//Список классов модифиаторов

//Объект с данными для отображения товара
export interface IProductView {
  id: string,
  title: string,
  image: string,
  price: number | null,
  categoryName: ProductCategory,
  categorytype?: string,
  description?: string,
}

//Объект с настройками для отображения данных о товаре
export interface IProductViewSettings {
  //Селектор вывода названия категории
  categorySelector?: string | null,
  //CSS класс-модификатор для изменения стиля отображения категории
  categoryType?: string,
  //Селектор в который будет выведено название товара
  titleSelector: string,
  //Селектор изображения товара
  imageSelector?: string,
  //Селектор для отображения описания товара (опционально)
  descriptionSelector?: string,
  //Селектор вывода стоиомсти товара
  priceSelector: string,
  //Валюта из списка валют (опционально)
  currency?: Currency, 
}

