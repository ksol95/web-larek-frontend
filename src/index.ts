import './scss/styles.scss';
//Типы и интерфейсы
import { IOrderBody } from './types'
import { ProductView } from './types/view/productView'
import { IOrderForm, IContactsForm, PaymentType } from './types/view/formsView'
//Компоненты
import { EventEmitter } from './components/base/events';
import { LocStorage } from './components/base/locStorage';
import { WebLarekApi } from './components/WebLarekApi';
//Модель приложения, хранит в себе все необходимые данные которыми будем манипулировать
import { AppModel } from "./components/AppModel";
//Компоненты отображения
import { MainPage } from "./components/PageView";
import { ProductCard } from "./components/ProductCardView";
import { Modal } from './components/ModalView';
import { Cart } from "./components/CartView";
import { OrderForm, ContactsForm } from "./components/FormsView";
import { OrderSuccess } from "./components/OrderSuccessView";
//Необходимые настройки и утилиты
import { API_URL, CDN_URL, eventList, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

//Из настроек достаём все необходимые селекторы
const selectors = settings.HTMLTemplates;
//Шаблоны карточек товаров
const productInCatalog_Template = ensureElement<HTMLTemplateElement>(selectors.productIncatalog);
const productInPreview_Template = ensureElement<HTMLTemplateElement>(selectors.preview);
const productInCart_Template = ensureElement<HTMLTemplateElement>(selectors.productInCart);
//Шаблон корзины
const cart_Template = cloneTemplate(ensureElement<HTMLTemplateElement>(selectors.cart));
//Шаблон заказа
const orderForm_Template = cloneTemplate<HTMLFormElement>(ensureElement<HTMLTemplateElement>(selectors.order));
const contactsForm_Template = cloneTemplate<HTMLFormElement>(ensureElement<HTMLTemplateElement>(selectors.contacts));
//Шаблон модального окна
const modalContainer = ensureElement<HTMLElement>(selectors.modal);
//Шаблон сообщения об успешной отправки заказа
const success_Template = cloneTemplate(ensureElement<HTMLTemplateElement>(selectors.success));
//Главная страница приложения
const page = ensureElement<HTMLElement>(selectors.page);

//Инициализируем классы
const api = new WebLarekApi(API_URL);//API для подключению к серверу
const event = new EventEmitter();//Слушатель событий
const appData = new AppModel({
  //Загружаем в модель корзину из LocalStorage
  cart: LocStorage.get('cart'),
}, event);//Модель данных всего приложения
const mainPage = new MainPage(page, event);//Отображение страницы
const modal = new Modal(modalContainer, event);//Отображенине модального окна
const cart = new Cart(cart_Template, event);//Отображение корзины
//Инициализация форм ввода пользовательской информации
const orderFormView = new OrderForm(orderForm_Template, event);
const contactsFormView = new ContactsForm(contactsForm_Template, event);

//Получаем из Api список товаров
api.getProductList()
  //В случае успеха загружаем полученные данные в модель
  //после загрузки данных в модель, инициализируется событие "MODEL_CHANGE"
  .then(res => appData.setProducts(res.items))
  .catch(console.error);


//Событие изменения продука
event.on(eventList.MODEL_CHANGE, () => {
  // Получаем из модели список всех товаров.
  // Из списка товаров получаем отдельный массив HTML элементов -
  // - карточек товаров. Каждая карточка, при клике, инициализирует событие "PRODUCT_PREVIEW"
  const catalog = appData.getProducts().map(product => {
    const productCard_inCatalog = new ProductCard(cloneTemplate(productInCatalog_Template), {
      //При клике по карточке инициализируется событие PRODUCT_PREVIEW и отправляется объект продукта 
      onClick: () => event.emit(eventList.PRODUCT_PREVIEW, product),
    });
    //Формируем каталог (productCard:HTMLElement[]) из элементов
    // массива всех продуктов (product) и объекта представления (productCard)
    return productCard_inCatalog.render({
      category: product.category,
      title: product.title,
      image: CDN_URL + product.image,
      // Если стоимость пришла с сервера NULL то отправляем пустую строку
      price: product.price === null ? '' : product.price.toString(),
    })
  });
  //выводим получиный каталог на главную страницу
  //а так же обновляем счётчик корзины
  mainPage.catalog = catalog;
  //Событие обновления корзины товаров
  event.emit(eventList.CART_CHANGE);
})

//Открытие модального окна с подробным описанием товара
event.on(eventList.PRODUCT_PREVIEW, (product: ProductView) => {
  const ProductCard_Preview = new ProductCard(cloneTemplate(productInPreview_Template), {
    onClick: () => {
      //При клике на кнопку внутри карточки в зависимости от того, был ли просматриваемый товар добавлен в корзину
      // иницализируем события - удалить товар из корзины "PRODUCT_REMOVE" или добавить в корзину - "PRODUCT_ADD"
      //Для обработки события, также, отправляем объект товара
      event.emit(appData.cart.includes(product.id) ? eventList.PRODUCT_REMOVE : eventList.PRODUCT_ADD, product);
      //Обновляем открытую карточку товара, для отображения изменения кнопки добавить\удалить товар из коризны
      event.emit(eventList.PRODUCT_PREVIEW, product);
    },
  });
  modal.render({
    content: ProductCard_Preview.render({
      image: CDN_URL + product.image,
      category: product.category,
      title: product.title,
      description: product.description,
      price: product.price === null ? '' : product.price.toString(),
      inCart: appData.cart.includes(product.id), //Если ID товара содержиться в массиве выбранных товаров, то изменить кнопку
      inMarket: (product.price === null), //Если у товара нет стоимости, то снять с продажи
    })
  });
})

//Событие клика по кнопке "Добавить в корзину" в карточке товара
event.on(eventList.PRODUCT_ADD, (product: ProductView) => {
  appData.addToCart(product.id);
  LocStorage.append('cart', product.id);
});

//Событие клика по кнопке "Удалить из корзины" в карточке товара
event.on(eventList.PRODUCT_REMOVE, (product: ProductView) => {
  appData.removeProductFromCart(product.id);
  LocStorage.removeItem('cart', product.id);
});

//Событие "открыть корзину". Данное событие иницализирует mainPage
//В конструкторе класса, кнопке корзины товаров на главной страницк, добавляется соотвествующий обработчик клика.
//Так же данное событие инициализируется внутри самой корзины, для обновления представления корзины после удаления товара.
event.on(eventList.CART_OPEN, () => {
  //СОбираем список товаров из корзины и формируем из них список
  const productsList = appData.getCart().map((productData, index) => {
    const productCard_inCart = new ProductCard(cloneTemplate(productInCart_Template), {
      onClick: () => {
        //Удаляем товар из корзины
        event.emit(eventList.PRODUCT_REMOVE, productData);
        //Обновляем представление корзины
        event.emit(eventList.CART_OPEN);
      },
    });
    //Отрисовка списка товаров в корзине
    return productCard_inCart.render({
      index: index + 1,
      title: productData.title,
      price: productData.price?.toString() || '0'
    })
  })
  //Отриссовывам модальное окно
  modal.render({
    content:
      //Рисуем корзину
      cart.render({
        products: productsList,
        total: appData.getTotalPrice(),
      })
  })
})

//Событие открытия формы ORDER, событие инициализируется в корзине при клике на кнопку "Оформить заказ"
//Кнопка доступна когда в корзине >= 1 товар
event.on(eventList.ORDER_OPEN, () => {
  modal.render({
    //Форма заполняется данными из модели, при следующем открытии формы, данные сохраняться
    content: orderFormView.render({
      payment: appData.order.payment,
      address: appData.order.address,
      valid: (appData.order.address !== ""),
      errors: [],
    })
  })
})

//При выборе метода оплаты, записываем выбранный метод
//(выбранный метод по умолчанию находиться в объекте настроек paymentMethods_default)
event.on(eventList.ORDER_PAYMENT_TYPE, (payment: PaymentType) => orderFormView.inputs.payment = payment.type);

// Изменилось одно из полей в форме заказа
event.on(eventList.ORDER_INPUTS_CHANGE, (data: { field: keyof IOrderForm, value: string }) => {
  orderFormView.setOrderField(data.field, data.value);
});
// Ошибка в форме заказа
event.on(eventList.ORDER_ERROR, (errors: Partial<IOrderForm>) => {
  orderFormView.valid = !errors;
  orderFormView.errors = Object.values(errors).filter(i => !!i).join('; ');
})

// Форма заказа готова к отправке, разблокируем кнопку 
event.on(eventList.ORDER_READY, () => orderFormView.valid = true);

///////////////////////////////////////////////////////////////////
//Событие "Открытие формы контакты"
event.on(eventList.ORDER_SUBMIT, () => {
  //Записываем в модель данные о заказе  
  appData.order = orderFormView.inputs;

  modal.render({
    //Отрисовка модального окна с формой Contacts
    content: contactsFormView.render({
      phone: appData.contacts.phone,
      email: appData.contacts.email,
      valid: (appData.contacts.phone && appData.contacts.email !== ''),
      errors: [],
    })
  })
})

// Изменилось одно из полей в форме контакты
event.on(eventList.CONTACTS_INPUTS_CHANGE, (data: { field: keyof IContactsForm, value: string }) => {
  contactsFormView.setContactsField(data.field, data.value);
});
// Ошибка в форме контакты
event.on(eventList.CONTACTS_ERROR, (errors: Partial<IContactsForm>) => {
  const { email, phone } = errors;
  contactsFormView.valid = !email && !phone;
  contactsFormView.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
})
//Форма контактов готова к отправке, разблокируем кнопку отправки
event.on(eventList.CONTACTS_READY, () => contactsFormView.valid = true);

//Отправка заказа
event.on(eventList.CONTACTS_SUBMIT, () => {
  //Записываем в модель контактную информацию
  appData.contacts = contactsFormView.inputs;
  //Формируем объект для отправки на сервер информацию о заказе
  const orderBody: IOrderBody = {
    payment: appData.order.payment,
    address: appData.order.address,
    email: appData.contacts.email,
    phone: appData.contacts.phone,
    items: [...appData.cart],
    total: appData.getTotalPrice(),
  }
  //Отправить через API 
  api.postOrder(orderBody)
    .then(res => {
      //Вывод в консоль ответ от сервера
      console.log(res);
      //Очищаем корзину
      appData.removeAllProductsFromCart();
      LocStorage.clear();
      //Оформляем ответ от сервераo в положительном случае
      const success = new OrderSuccess(success_Template, {
        onClick: () => {
          //Закрываем модальное окно
          modal.close();
        }
      });
      //Отрисовываем модальное окно с положительным ответом от сервера
      modal.render({
        content: success.render({
          total: res.total,
        }),
      });
    })
    .catch(console.error);
})

//Обновление счётчика товаров в корзине
event.on(eventList.CART_CHANGE, () => mainPage.counter = appData.getCountCart())

//Блокируем/Разблокируем страницу
event.on(eventList.MODAL_OPEN_CLOSE, () => {
  mainPage.togglePageLock();
})
