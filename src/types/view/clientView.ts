import { IClientForm, PaymentMethod } from "..";

export interface IClientView {
  client: IClientForm,
}

export interface IClentViewSettings {
  paymentMethodActive: PaymentMethod,
  paymentMethodSelector: string,
  adressInput: string,
  emailInpyt: string,
  phoneInput: string,
}