import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
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
  customerResp: CustomerModel[];
  cutomerToEdit: CustomerModel;
  pageCount = 0;
  url = "";
  page = 1;

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
  ngOnInit(): void {}

  onEdit(customer: CustomerModel) {
    this.cutomerToEdit = customer;
    this.selectedTab = 2;
  }

  onUpdate(event: any) {
    this.service.update(event.customer).subscribe((resp: CustomerModel) => {
      this.customerResp.forEach((element) => {
        if (element._id == resp._id) {
          element.name = resp.name;
          element.region = resp.region;
          element.gstinNo = resp.gstinNo;
          element.pan = resp.pan;
          element.address = resp.address;
        }
      });
      this.onCancel();
    });
  }

  onAdd(event: any) {
    this.service.add(event.customer).subscribe((val) => {
      return event.form.reset();
    });
  }
  onReset(form: FormGroup) {
    form.reset();
  }
  onCancel() {
    this.cutomerToEdit = null;
    this.selectedTab = 0;
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
      case "all": {
        url = `${url}?`;
        break;
      }
    }
    this.url = url;
    this.changePage(1);
  }

  getServiceCall(url: String, pageNo?: number) {
    this.service.get(url).subscribe((res: any) => {
      this.customerResp = res.result;
      this.pageCount = res.pageCount;
      this.isSearched = true;
      this.page = res.pageCount > 0 ? (pageNo > 0 ? pageNo : 0) : 0;
    });
  }

  onDelete(customer: CustomerModel) {
    this.service.delete(customer._id).subscribe((c) => {
      if (this.page < this.pageCount || this.customerResp.length != 1) {
        this.changePage(this.page);
      } else if (this.page > 1) {
        this.changePage(this.page - 1);
      } else {
        this.customerResp = [];
        this.pageCount = 0;
        this.page = 0;
      }
    });
  }
  changePage(pageNo: any) {
    this.getServiceCall(`${this.url}&page=${pageNo}`, pageNo);
  }
}
