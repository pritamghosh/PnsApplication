import { Component, OnInit, Input } from "@angular/core";
import { ContractModel } from "src/app/models/contract.model ";

@Component({
  selector: "app-contract-details",
  templateUrl: "./contract-details.component.html",
  styleUrls: ["./contract-details.component.scss"],
})
export class ContractDetailsComponent implements OnInit {
  @Input("contracts") contracts: ContractModel[];
  constructor() {}

  ngOnInit(): void {}

  renewContracts(contract: ContractModel) {}
  edit(contract: ContractModel) {}
  print(contract: ContractModel) {}
}
