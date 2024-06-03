export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	request_productList: '/product',
	request_productItem: '/product/',
	request_order: '/order',

	categoryClass: 'card__category_', //Префикс класса модификатора для категории
	сategoryType: {
		//соотношение названия категории к классу
		['софт-скил']: 'soft',
		['хард-скил']: 'hard',
		['другое']: 'other',
		['кнопка']: 'button',
		['дополнительное']: 'additional',
	},

	productCardTemplateSelectors: {
		category: `.card__category`,
		title: `.card__title`,
		description: `.card__text`,
		price: `.card__price`,
		button: `.card__button`,
		image: `.card__image`,
		cart: `.basket__item-index`,
	},

	pageLockedClass: 'page__wrapper_locked',
	pageTemplateSelectors: {
		counter: '.header__basket-counter',
		catalog: '.gallery',
		wrapper: '.page__wrapper',
		cart: '.header__basket',
	},

	cartTemplateSelectors: {
		list: '.basket__list',
		emptyStyle: 'basket__item card card_compact',
		price: '.basket__price',
		action: '.basket__button',
	},

	modalTemplateSelectors: {
		closeBtn: '.modal__close',
		content: '.modal__content',
		open: 'modal_active',
	},

	orderSuccessTemplate: {
		title: '.order-success__title',
		description: '.order-success__description',
		button: '.order-success__close',
	},

	paymentMethods_default: 'card',
	paymentMethods: {
		['При получении']: 'cash',
		['Онлайн']: 'card',
	},

	formErr: '.form__errors', //Селектор элемента для вывода текста ошибки валидации формы
	orderForm: {
		paymentButtons: '.button_alt',
		paymentBtnActive: 'button_alt-active',
		inputName: 'name',
		inputAddress: 'address',
	},

	contactsForm: {
		inputPhone: 'phone',
		inputEmail: 'email',
	},

	HTMLTemplates: {
		catalog: '.gallery',
		success: '#success',
		productIncatalog: '#card-catalog',
		preview: '#card-preview',
		modal: '#modal-container',
		productInCart: '#card-basket',
		cart: '#basket',
		order: '#order',
		contacts: '#contacts',
	},

	text: {
		deleteFromCart_btn: 'Удалить из корзины',
		addToCart_btn: 'Добавить в корзину',
		currency: ' синапсов',
		nullPrice: 'Бесценно',
		offTheMarket: 'Недоступно',
		cartEmpty: 'Корзина пуста',
		success: 'Списано',
	},
};
//Список отслеживаемых событий
export const eventList = {
	//Изменение в моделе
	MODEL_CHANGE: 'product:change',

	//Открыть превью товара
	PRODUCT_PREVIEW: 'prduct:preview',
	//Добавление в корзину
	PRODUCT_ADD: 'prduct:addToCart',
	//Удаление из корзины
	PRODUCT_REMOVE: 'prduct:removeFromCart',
	//Очистить всю корзину
	PRODUCT_REMOVE_ALL: 'prduct:removeAllFromCart',

	//Событие открытия окна с корзиной
	CART_OPEN: 'cart:open',
	//Оформление заказа
	CART_ORDER: 'cart:order',
	//Изменения корзины
	CART_CHANGE: 'cart:change',

	//Выбор типа оплаты
	ORDER_PAYMENT_TYPE: 'order:changePaymentType',
	//Изменение в инпуте "адрес"
	ORDER_ADDRESS_CHANGE: 'order.address:change',
	//Ошибка формы заказа
	ORDER_ERROR: 'orderFormErrors:change',
	//Форма заказа без ошибок
	ORDER_READY: 'orderFormErrors:ready',
	//Отправка формы ORDER
	ORDER_SUBMIT: 'order:submit',

	//Изменение в инпуте "адрес"
	CONTACTS_INPUTS_CHANGE: /^contacts\..*:change/,
	//Ошибка формы контактов
	CONTACTS_ERROR: 'contactsFormErrors:change',
	//Форма контакты без ошибок
	CONTACTS_READY: 'contactsFormErrors:ready',
	//Отправка формы ORDER
	CONTACTS_SUBMIT: 'contacts:submit',

	//Открытие/закрытие любого модельного окна
	MODAL_OPEN: 'modal:open',
	MODAL_CLOSE: 'modal:close',
};
