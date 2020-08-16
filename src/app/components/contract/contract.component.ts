import { Component, OnInit } from "@angular/core";
import { ContractService } from "src/app/services/contract.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ContractModel } from "src/app/models/contract.model ";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
})
export class ContractComponent implements OnInit {
  selectedTab = 0;
  contractToEdit: ContractModel;
  contractToRenew: ContractModel;
  isSearched = false;
  pageCount = 0;
  url = "";
  page = 1;
  contractResp: ContractModel[];

  seachKeyControl = new FormControl(null, [Validators.required]);
  startDate = new FormControl(null, [Validators.required]);
  endDate = new FormControl(null, [Validators.required]);
  searchOption = [
    {
      value: "Find All",
      type: "all",
      searchFieldName: "Keep It Blank",
      searchButtonName: "Find All",
    },
    {
      value: "Find By AMC Date Range",
      type: "byAmcDateRange",
      searchButtonName: "Find By Date",
    },
    {
      value: "Find By Contract Create/Renew Date Range",
      type: "byCreationDateRange",
      searchButtonName: "Find By Date",
    },
    {
      value: "Search Contract",
      type: "search",
      searchFieldName: "Enter Key for Searching",
      searchButtonName: "Search",
    },
  ];

  selectedOption = this.searchOption[0];
  constructor(
    private service: ContractService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["customerId"]) {
        this.search(`/customer/${params["customerId"]}`);
      } else if (params["equipmentId"]) {
        this.search(`/equipment/${params["equipmentId"]}`);
      }
    });
  }
  get minSearchDate() {
    return this.startDate.value;
  }
  isSeachButtonDisabled() {
    if (this.selectedOption.type == "all") {
      return false;
    }
    if (
      this.selectedOption.type == "byAmcDateRange" ||
      this.selectedOption.type == "byCreationDateRange"
    ) {
      return !(this.endDate.valid && this.startDate.valid);
    }
    return !this.seachKeyControl.valid;
  }

  isSeachFieldDisabled() {
    if (this.selectedOption.type == "all") {
      this.seachKeyControl.reset();
      return true;
    }
    return false;
  }

  findContract() {
    let url = "";
    switch (this.selectedOption.type) {
      case "byCreationDateRange": {
        url = `${url}?form=${this.datePipe.transform(
          this.startDate.value,
          "yyyy-MM-dd"
        )}&to=${this.datePipe.transform(
          this.endDate.value,
          "yyyy-MM-dd"
        )}&create=true`;
        break;
      }
      case "byAmcDateRange": {
        url = `${url}?form=${this.datePipe.transform(
          this.startDate.value,
          "yyyy-MM-dd"
        )}&to=${this.datePipe.transform(this.endDate.value, "yyyy-MM-dd")}`;
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
    this.search(url);
  }

  search(url: string, pageNo?: number) {
    this.service.get(url).subscribe((res: any) => {
      this.contractResp = res.result;
      this.isSearched = true;
      this.pageCount = res.pageCount;
      this.page = res.pageCount > 0 ? (pageNo > 0 ? pageNo : 0) : 0;
    });
  }

  changePage(pageNo: any) {
    this.search(`${this.url}&page=${pageNo}`, pageNo);
  }

  add(event: any) {
    this.service.add(event.contract, false).subscribe((val) => {
      event.form.reset();
    });
  }

  onRenew(event: any) {
    this.service
      .add(event.contract, true)
      .subscribe((res) => this.cancelRenew());
  }

  edit(contract: ContractModel) {
    this.contractToEdit = contract;
    this.selectedTab = 2;
  }

  renew(contract: ContractModel) {
    this.contractToRenew = contract;
    this.selectedTab = 3;
  }

  cancelUpdate() {
    this.contractToEdit = null;
    this.selectedTab = 0;
  }

  cancelRenew() {
    this.contractToRenew = null;
    this.selectedTab = 0;
  }

  reset(event: any) {
    event.formGroup.patchValue({ amcTax: 18 });
    event.form.reset();
  }

  update(event: any) {
    console.log("update");

    this.service
      .update(event.contract)
      .subscribe((resp) => this.cancelUpdate());
  }
}
