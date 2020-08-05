import { Component, OnInit, Input } from "@angular/core";
import { CustomerModel } from "src/app/models/customer.model";

@Component({
  selector: "app-customer-details",
  templateUrl: "./customer-details.component.html",
  styleUrls: ["./customer-details.component.scss"],
})
export class CustomerDetailsComponent implements OnInit {
  @Input("customers") customers: CustomerModel[];
  constructor() {}

  ngOnInit(): void {}

  viewContracts(customer: CustomerModel) {}
  delete(customer: CustomerModel) {}
  edit(customer: CustomerModel) {}
}
