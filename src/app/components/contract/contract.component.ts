import { Component, OnInit } from "@angular/core";
import { ContractService } from "src/app/services/contract.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ContractModel } from "src/app/models/contract.model ";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
})
export class ContractComponent implements OnInit {
  selectedTab = 0;
  isSearched = false;
  contractResp: ContractModel[];

  seachKeyControl = new FormControl(null, [Validators.required]);
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
  constructor(private service: ContractService) {}

  ngOnInit(): void {}

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
    this.service.get(url).subscribe((res: ContractModel[]) => {
      this.contractResp = res;
      this.isSearched = true;
    });
  }
}
