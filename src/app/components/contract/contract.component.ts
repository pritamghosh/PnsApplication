import { Component, OnInit } from "@angular/core";
import { ContractService } from "src/app/services/contract.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ContractModel } from "src/app/models/contract.model ";
import { ActivatedRoute } from "@angular/router";

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
      value: "Find By Date Range",
      type: "byDateRange",
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
    private route: ActivatedRoute
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

  isSeachButtonDisabled() {
    if (this.selectedOption.type == "all") {
      return false;
    }
    if (this.selectedOption.type == "byDateRange") {
      return !(this.endDate.valid && this.startDate.valid);
    }
    return false;
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
      case "byName": {
        url = `${url}?name=${this.seachKeyControl.value}`;
        break;
      }
      case "byDateRange": {
        url = `${url}?region=${this.seachKeyControl.value}`;
        break;
      }
      case "search": {
        url = `${url}/search?query=${this.seachKeyControl.value}`;
        break;
      }
    }
    this.search(url);
  }

  search(url: string) {
    this.service.get(url).subscribe((res: ContractModel[]) => {
      this.contractResp = res;
      this.isSearched = true;
    });
  }

  add(contract: ContractModel) {
    this.service.add(contract, false).subscribe();
  }

  onRenew(contract: ContractModel) {
    this.service.add(contract, true).subscribe((res) => this.cancelRenew());
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

  reset(form: FormGroup) {
    form.reset;
    form.patchValue({ amcTax: 18 });
  }

  update(contract: ContractModel) {
    this.service.update(contract).subscribe((resp) => this.cancelUpdate());
  }
}
