import { CustomerModel } from "./customer.model";
import { EquipmnetItemModel } from "./equipment.item.model";

export interface ContractModel {
  customer: CustomerModel;
  equipmentItem: EquipmnetItemModel;
  amcStartDate: Date;
  amcEndDate: Date;
  amcBasicAmount: Date;
  amcTotalAmount: number;
  amcTax: number;
  billingCycle: string;
  note: string;
  _id: string;
}
