import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ContractModel } from "src/app/models/contract.model ";
import { ContractService } from "src/app/services/contract.service";
import { RoleService } from "src/app/services/role.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-contract-details",
  templateUrl: "./contract-details.component.html",
  styleUrls: ["./contract-details.component.scss"],
})
export class ContractDetailsComponent implements OnInit {
  @Input("contracts") contracts: ContractModel[];
  @Output("edit") editEmitter: EventEmitter<ContractModel> = new EventEmitter();
  @Output("delete") delete: EventEmitter<ContractModel> = new EventEmitter();
  @Output("renew") renewEmitter: EventEmitter<
    ContractModel
  > = new EventEmitter();
  statusMap: Map<string, string> = new Map();
  constructor(private service: ContractService, public role: RoleService) {}

  ngOnInit(): void {}

  renewContract(contract: ContractModel) {
    this.renewEmitter.emit(contract);
  }
  editContract(contract: ContractModel) {
    this.editEmitter.emit(contract);
  }

  deleteConract(contract: ContractModel) {
    this.delete.emit(contract);
  }
}
