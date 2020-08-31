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
  contractDate: Date;
  proposalNo: string;
  poFileContent: any;
  poFileContentType: string;
  poFileName: string;
  status: "PENDING" | "APPROVED" | "MODIFICATION_REQUIRED" | "L1_APPROVED";
}
