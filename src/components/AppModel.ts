import { Model } from './base/model';
import {
  IProduct,
  IAppModel,
} from '../types';
import { IOrderForm, IContactsForm, paymentMethod } from '../types/view/formsView';
import { eventList, settings } from '../utils/constants';

export class AppModel extends Model<IAppModel> implements IAppModel {
  cart: string[];
  products: IProduct[] = [];
  //Поля ввода пользовательской информации (приходят из форм Order и Contacts соответственно)
  order: IOrderForm = {
    address: '',
    payment: <paymentMethod>settings.paymentMethods_default,
  };
  contacts: IContactsForm = {
    phone: '',
    email: '',
  };

  setProducts(products: IProduct[]) {
    if (this.products) this.products = products;    
    this.events.emit(eventList.MODEL_CHANGE);
  }
  getProducts() {
    return this.products;
  }
  addToCart(id: string) {
    if (!this.cart.includes(id)) {
      this.cart.push(id);
      //Сообщаем об изменении в корзине
      this.emitChanges(eventList.CART_CHANGE, this.products);
    }
  }
  removeProductFromCart(id: string) {
    if (this.cart.includes(id)) {
      //Получаем индекс ID в массиве
      const index = this.cart.findIndex((i) => i === id);
      //Удаляем из массива по найденому индексу
      this.cart.splice(index, 1);
      //Сообщаем об изменении в корзине (Обновить счётчик на главной странице)
      this.emitChanges(eventList.CART_CHANGE);
    }
  }

  getCart() {
    return this.products.filter((product) => this.cart.includes(product.id));
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (const PID of this.cart) {
      const product = this.products.find((product) => product.id === PID);

      if (product && product.price) {
        totalPrice += product.price;
      } else return;
    }
    return totalPrice;
  }

  getProductsCount() {
    return this.products.length;
  }

  getCountCart() {
    return this.cart.length;
  }

  removeAllProductsFromCart() {
    this.cart = [];
    //Сообщаем об изменении в корзине (Обновить счётчик на главной странице)
    this.emitChanges(eventList.CART_CHANGE);
  }
}
