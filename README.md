# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Документация
##1. Описание данных

##2. Модели данных

##3. Описание событий

События хранятся в объекте - "eventsList" по пути "./utils/constants.ts"
```
-   export const eventsList = {
-     //События открытия и закрытия модальных окон
-     ['MODAL_OPEN']: 'modal:open',
-     ['MODAL_CLOSE']: 'modal:close',
- 
-     //Изменение статуса "в корзине"
-     ['PRODUCT_CHANGE']: 'product:change',
-     //Открыть модальное окно с подробным описанием товара
-     ['PRODUCT_OPEN']: 'product:open',
- 
-     //Событие открытия окна с корзиной
-     ['CART_OPEN']: 'cart:open',
- 
-    //Открыть модальное окно с формой данных о клиенте
-     ['CLIENT_OPEN']: 'client:open',
-     //Отправка формы заказа
-     ['CLIENT_SUBMIT']: 'client:submit',
-     //Выбор типа оплаты
-     ['CLIENT_PAYMENT_TYPE']: 'client:changePaymentType',
-     //Валидация формы
- 
-     ['FORM_ERRORS_CHANGE']: 'formErrors:change',
-   }
```
