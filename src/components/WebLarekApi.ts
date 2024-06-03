import { Api } from './base/api';
import {
	IOrderResult,
	IOrderBody,
	IProductList,
	IProduct,
	IWebLarekApi,
} from '../types';
import { settings } from '../utils/constants';

export class WebLarekApi extends Api implements IWebLarekApi {
	constructor(baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	async getProductList(): Promise<IProductList> {
		return (await this.get(settings.request_productList)) as IProductList;
	}

	async getProduct(id: string): Promise<IProduct> {
		return (await this.get(`${settings.request_productItem}${id}`)) as IProduct;
	}

	async postOrder(order: IOrderBody): Promise<IOrderResult> {
		return (await this.post(settings.request_order, order)) as IOrderResult;
	}
}
