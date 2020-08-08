import { CustomerModel } from "./customer.model";
import { EquipmnetItemModel } from "./equipment.item.model";

export interface ContractModel {
  customer: CustomerModel;
  equipmentItem: EquipmnetItemModel;
  amcStartDate: Date;
  amcEndDate: any;
  amcBasicAmount: Date;
  amcTotalAmount: number;
  amcTax: number;
  amcTaxAmount: number;
  billingCycle: string;
  note: string;
  _id: string;
}
