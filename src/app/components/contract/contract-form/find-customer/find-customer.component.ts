import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Validators, FormControl } from "@angular/forms";
import { CustomerService } from "src/app/services/customer.service";
import { CustomerModel } from "src/app/models/customer.model";

@Component({
  selector: "app-find-customer",
  templateUrl: "./find-customer.component.html",
  styleUrls: ["./find-customer.component.scss"],
})
export class FindCustomerComponent implements OnInit {
  searchKeyControl = new FormControl(null, Validators.required);
  customerResp: CustomerModel[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FindCustomerComponent>,
    private service: CustomerService
  ) {}

  ngOnInit(): void {}

  onSelection(selected: any[]) {
    if (selected != null) {
      this.data.customer = selected[0].value;
    }
  }

  search() {
    this.service
      .get(`/search?query=${this.searchKeyControl.value}`)
      .subscribe((res: CustomerModel[]) => {
        this.customerResp = res;
      });
  }
}
