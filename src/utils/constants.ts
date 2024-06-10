export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	request_productList: '/product',
	request_productItem: '/product/',
	request_order: '/order',
	//Префикс класса модификатора для категории товара
	categoryClass: 'card__category_',
	сategoryType: {
		//соотношение названия категории к классу модификатору.
		//В итоге, если категория товара 'софт-скил', должно получится:
		//categoryClass+сategoryType['софт-скил'] = 'card__category_soft';
		['софт-скил']: 'soft',
		['хард-скил']: 'hard',
		['другое']: 'other',
		['кнопка']: 'button',
		['дополнительное']: 'additional',
	},

	//Селекторы внутри всех шаблонов карточки товара
	productCardTemplateSelectors: {
		category: `.card__category`,
		title: `.card__title`,
		description: `.card__text`,
		price: `.card__price`,
		button: `.card__button`,
		image: `.card__image`,
		cart: `.basket__item-index`,
	},

	//Класс модификатор устанавливается на 'wrapper' при открытии модального окна
	pageLockedClass: 'page__wrapper_locked',
	//Селекторы представления главной страницы
	pageTemplateSelectors: {
		wrapper: '.page__wrapper',
		counter: '.header__basket-counter',
		catalog: '.gallery',
		cart: '.header__basket',
	},

	//Селекторы шаблона корзины товаров
	cartTemplateSelectors: {
		list: '.basket__list',
		price: '.basket__price',
		action: '.basket__button',
		//Строка с карточкой товара, необходимо для вывода строки с сообщением о пустой корзине
		emptyStyle: 'basket__item card card_compact',
	},

	//Селекторы шаблона модального окна
	modalTemplateSelectors: {
		closeBtn: '.modal__close',
		content: '.modal__content',
		//Класс модификатор открытого окна
		activeModal: 'modal_active',
	},

	//Селекторы шаблона представления сообщения об успешной отправки заказа
	orderSuccessTemplate: {
		title: '.order-success__title',
		description: '.order-success__description',
		button: '.order-success__close',
	},

	//Выбраный метод оплаты по-умолчанию в форме заказа
	paymentMethods_default: 'card',
	//Название методов оплаты соотносятся с именем кнопки выбора метода оплаты
	paymentMethods: {
		['При получении']: 'cash',
		['Онлайн']: 'card',
	},

	//Селектор элемента для вывода текста ошибки валидации формы в представлении формы
	formErr: '.form__errors',
	//Селекторы, классы модификаторы, имена полей ввода для формы заказа
	orderForm: {
		paymentButtons: '.button_alt',
		paymentBtnActive: 'button_alt-active',
		inputName: 'name',
		inputAddress: 'address',
	},

	//Поля ввода формы "Контакты"
	contactsForm: {
		inputPhone: 'phone',
		inputEmail: 'email',
	},

	//Селекторы шаблонов
	HTMLTemplates: {
		success: '#success',
		productIncatalog: '#card-catalog',
		preview: '#card-preview',
		modal: '#modal-container',
		productInCart: '#card-basket',
		cart: '#basket',
		order: '#order',
		contacts: '#contacts',
		page: ".page",
	},

	text: {
		deleteFromCart_btn: 'Удалить из корзины',
		addToCart_btn: 'Добавить в корзину',
		currency: ' синапсов',
		nullPrice: 'Бесценно',
		offTheMarket: 'Недоступно',
		cartEmpty: 'Корзина пуста',
		success: 'Списано',
		err:{
			emptyAddress: 'Необходимо указать адрес',
			emptyPhone: 'Необходимо указать телефон',
			emptyEmail: 'Необходимо указать email',
		}
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
	ORDER_OPEN: 'order:open',
	//Изменения корзины
	CART_CHANGE: 'cart:change',

	//Выбор типа оплаты
	ORDER_PAYMENT_TYPE: 'order:changePaymentType',
	//Изменение в полях ввода формы "Заказ", используется регулярное выраженине
	//универсальное событие всех полей ввода в форме 
	ORDER_INPUTS_CHANGE: /^order\..*:change/,
	//Ошибка формы заказа
	ORDER_ERROR: 'orderFormErrors:change',
	//Форма заказа без ошибок
	ORDER_READY: 'orderFormErrors:ready',
	//Отправка формы ORDER
	ORDER_SUBMIT: 'order:submit',

	//Изменение в полях ввода формы "Контакты", используется регулярное выраженине
	//универсальное событие всех полей ввода в форме 
	CONTACTS_INPUTS_CHANGE: /^contacts\..*:change/,
	//Ошибка формы контактов
	CONTACTS_ERROR: 'contactsFormErrors:change',
	//Форма контакты без ошибок
	CONTACTS_READY: 'contactsFormErrors:ready',
	//Отправка формы ORDER
	CONTACTS_SUBMIT: 'contacts:submit',

	//Открытие/закрытие любого модельного окна
	MODAL_OPEN_CLOSE: 'modal:open/close',
};
