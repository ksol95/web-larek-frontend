export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

//card__category_(?soft)
export const сategoryType = {
  ['софт-скил']: 'soft',
  ['хард-скил']: 'hard',
  ['другое']: 'other',
  ['кнопка']: 'button',
  ['дополнительное']: 'additional'
}

//Список отслеживаемых событий
export const eventsList = {
  //
  ['MODAL_OPEN']: 'modal:open',
  ['MODAL_CLOSE']: 'modal:close',
  
  // ['PRODUCT_REMOVE_FROM_CART']: 'PRODUCT:removeProductFromCart',
  // ['PRODUCT_ADD_TO_CART']: 'product:addToCart',

   //Изменение статуса "в корзине"
  ['PRODUCT_CHANGE']: 'product:change',
  //Открыть модальное окно с подробным описанием товара
  ['PRODUCT_OPEN']: 'product:open',
  //Событие открытия окна с корзиной
  ['CART_OPEN']: 'cart:open',
  //Открыть модальное окно с формой данных о клиенте
  ['CLIENT_OPEN']: 'client:open',
  //Отправка формы заказа
  ['CLIENT_SUBMIT']: 'client:submit',
  //Выбор типа оплаты
  ['CLIENT_PAYMENT_TYPE']: 'client:changePaymentType',
  //Валидация формы
  ['FORM_ERRORS_CHANGE']: 'formErrors:change',
}