import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CustomerModel } from "src/app/models/customer.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-customer-details",
  templateUrl: "./customer-details.component.html",
  styleUrls: ["./customer-details.component.scss"],
})
export class CustomerDetailsComponent implements OnInit {
  @Input("customers") customers: CustomerModel[];
  @Output() edit: EventEmitter<CustomerModel> = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewContracts(customer: CustomerModel) {
    this.router.navigate(["contract"], {
      queryParams: { customerId: customer._id },
    });
  }
  onDelete(customer: CustomerModel) {}
  onEdit(customer: CustomerModel) {
    this.edit.emit(customer);
  }
}
