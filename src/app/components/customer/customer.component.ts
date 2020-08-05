import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomerService } from "src/app/services/customer.service";
import { CustomerModel } from "src/app/models/customer.model";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  selectedTab = 0;
  isSearched = false;
  customerForm: FormGroup;
  customerResp: CustomerModel[];

  seachKeyControl = new FormControl(null, [Validators.required]);
  searchOption = [
    {
      value: "Find All",
      type: "all",
      searchFieldName: "Keep It Blank",
      searchButtonName: "Find All",
    },
    {
      value: "Find By Name",
      type: "byName",
      searchFieldName: "Enter Customer Name",
      searchButtonName: "Find By Name",
    },
    {
      value: "Find By Region",
      type: "byRegion",
      searchFieldName: "Enter Costomer Region",
      searchButtonName: "Find By Region",
    },
    {
      value: "Search Customer",
      type: "search",
      searchFieldName: "Enter Key for Searching",
      searchButtonName: "Search",
    },
  ];

  selectedOption = this.searchOption[0];
  constructor(private service: CustomerService) {}
  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      region: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.service.add(this.customerForm.value);
  }

  onReset() {
    this.customerForm.reset();
  }

  isSeachButtonDisabled() {
    return this.selectedOption.type != "all" && !this.seachKeyControl.valid;
  }

  isSeachFieldDisabled() {
    if (this.selectedOption.type == "all") {
      this.seachKeyControl.reset();
      return true;
    }
    return false;
  }

  findCustomer() {
    let url = "";
    switch (this.selectedOption.type) {
      case "byName": {
        url = `${url}?name=${this.seachKeyControl.value}`;
        break;
      }
      case "byRegion": {
        url = `${url}?region=${this.seachKeyControl.value}`;
        break;
      }
      case "search": {
        url = `${url}/search?query=${this.seachKeyControl.value}`;
        break;
      }
    }
    this.service.get(url).subscribe((res: CustomerModel[]) => {
      this.customerResp = res;
      this.isSearched = true;
    });
  }
}
