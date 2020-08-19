import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CustomerModel } from "src/app/models/customer.model";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";
import { RoleService } from "src/app/utility/services/role.service";

@Component({
  selector: "app-customer-details",
  templateUrl: "./customer-details.component.html",
  styleUrls: ["./customer-details.component.scss"],
})
export class CustomerDetailsComponent implements OnInit {
  @Input("customers") customers: CustomerModel[];
  @Output() edit: EventEmitter<CustomerModel> = new EventEmitter();
  @Output() delete: EventEmitter<CustomerModel> = new EventEmitter();
  constructor(private router: Router, public role: RoleService) {}

  ngOnInit(): void {}

  viewContracts(customer: CustomerModel) {
    this.router.navigate(["contract"], {
      queryParams: { customerId: customer._id },
    });
  }
  onDelete(customer: CustomerModel) {
    if (window.confirm("Are You Sure To Delete This Customer")) {
      this.delete.emit(customer);
    }
  }
  onEdit(customer: CustomerModel) {
    this.edit.emit(customer);
  }
}
