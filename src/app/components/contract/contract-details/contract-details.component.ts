import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ContractModel } from "src/app/models/contract.model ";
import { ContractService } from "src/app/services/contract.service";
import { RoleService } from "src/app/utility/services/role.service";

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
  constructor(private service: ContractService, public role: RoleService) {}

  ngOnInit(): void {}

  renewContracts(contract: ContractModel) {
    this.renewEmitter.emit(contract);
  }
  edit(contract: ContractModel) {
    this.editEmitter.emit(contract);
  }
  viewPo(contract: ContractModel) {
    const raw = window.atob(contract.poFileContent);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    let blob = new Blob([uInt8Array], { type: contract.poFileContentType });
    let fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
  }
  print(contract: ContractModel) {
    this.service.getReport(contract._id).subscribe();
  }

  onDelete(contract: ContractModel) {
    if (window.confirm("Are You Sure To Delete This Contract")) {
      this.delete.emit(contract);
    }
  }
}
