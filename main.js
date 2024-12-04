/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e={"./src/components/WebLarekApi.ts":(e,t,r)=>{r.r(t),r.d(t,{WebLarekApi:()=>i});var o=r("./src/components/base/api.ts"),n=r("./src/utils/constants.ts");function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===_typeof(i)?i:String(i)),o)}var n,i}function _setPrototypeOf(e,t){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function _setPrototypeOf(e,t){return e.__proto__=t,e},_setPrototypeOf(e,t)}function _createSuper(e){var t=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var r,o=_getPrototypeOf(e);if(t){var n=_getPrototypeOf(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return function _possibleConstructorReturn(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,r)}}function _getPrototypeOf(e){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(e){return e.__proto__||Object.getPrototypeOf(e)},_getPrototypeOf(e)}var i=function(e){!function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}(WebLarekApi,e);var t=_createSuper(WebLarekApi);function WebLarekApi(e,r){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,WebLarekApi),t.call(this,e,r)}return function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(WebLarekApi,[{key:"getProductList",value:function getProductList(){return this.get(n.settings.request_productList)}},{key:"getProduct",value:function getProduct(e){return this.get("".concat(n.settings.request_productItem).concat(e))}},{key:"postOrder",value:function postOrder(e){return this.post(n.settings.request_order,e)}}]),WebLarekApi}(o.Api)},"./src/components/base/api.ts":(e,t,r)=>{function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===_typeof(i)?i:String(i)),o)}var n,i}r.r(t),r.d(t,{Api:()=>o});var o=function(){function Api(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Api),this.baseUrl=e,this.options={headers:Object.assign({"Content-Type":"application/json"},null!==(t=r.headers)&&void 0!==t?t:{})}}return function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(Api,[{key:"handleResponse",value:function handleResponse(e){return e.ok?e.json():e.json().then((function(t){var r;return Promise.reject(null!==(r=t.error)&&void 0!==r?r:e.statusText)}))}},{key:"get",value:function get(e){return fetch(this.baseUrl+e,Object.assign(Object.assign({},this.options),{method:"GET"})).then(this.handleResponse)}},{key:"post",value:function post(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"POST";return fetch(this.baseUrl+e,Object.assign(Object.assign({},this.options),{method:r,body:JSON.stringify(t)})).then(this.handleResponse)}}]),Api}()},"./src/utils/constants.ts":(e,t,r)=>{var o,n;function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _defineProperty(e,t,r){return(t=function _toPropertyKey(e){var t=function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===_typeof(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t),r.d(t,{API_URL:()=>i,CDN_URL:()=>s,eventsList:()=>p,settings:()=>c,сategoryType:()=>u});var i="".concat("https://larek-api.nomoreparties.co","/api/weblarek"),s="".concat("https://larek-api.nomoreparties.co","/content/weblarek"),c={request_productList:"/product",request_productItem:"/product/",request_order:"/order"},u=(_defineProperty(o={},"софт-скил","soft"),_defineProperty(o,"хард-скил","hard"),_defineProperty(o,"другое","other"),_defineProperty(o,"кнопка","button"),_defineProperty(o,"дополнительное","additional"),o),p=(_defineProperty(n={},"MODAL_OPEN","modal:open"),_defineProperty(n,"MODAL_CLOSE","modal:close"),_defineProperty(n,"PRODUCT_CHANGE","product:change"),_defineProperty(n,"PRODUCT_OPEN","product:open"),_defineProperty(n,"CART_OPEN","cart:open"),_defineProperty(n,"CLIENT_OPEN","client:open"),_defineProperty(n,"CLIENT_SUBMIT","client:submit"),_defineProperty(n,"CLIENT_PAYMENT_TYPE","client:changePaymentType"),_defineProperty(n,"FORM_ERRORS_CHANGE","formErrors:change"),n)},"./src/scss/styles.scss":(e,t,r)=>{r.r(t)}},t={};function __webpack_require__(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{__webpack_require__.r(r);__webpack_require__("./src/scss/styles.scss");var e=__webpack_require__("./src/components/WebLarekApi.ts"),t=__webpack_require__("./src/utils/constants.ts"),o=new e.WebLarekApi(t.API_URL);console.log(o.getProductList()),console.log(o.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390"))})()})();
//# sourceMappingURL=main.js.map