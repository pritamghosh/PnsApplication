import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ContractModel } from "src/app/models/contract.model ";
import { ContractService } from "src/app/services/contract.service";
import { RoleService } from "src/app/services/role.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-contract-details-view",
  templateUrl: "./contract-details-view.component.html",
  styleUrls: ["./contract-details-view.component.scss"],
})
export class ContractDetailsViewComponent implements OnInit {
  @Input("contract") contract: ContractModel;
  @Output("edit") editEmitter: EventEmitter<ContractModel> = new EventEmitter();
  @Output("delete") delete: EventEmitter<ContractModel> = new EventEmitter();
  @Output("renew") renewEmitter: EventEmitter<
    ContractModel
  > = new EventEmitter();
  statusMap: Map<string, string> = new Map();
  comment: FormControl = new FormControl(null, Validators.required);
  constructor(private service: ContractService, public role: RoleService) {
    this.statusMap.set("PENDING", "PENDING FOR L1 APPROVAL");
    this.statusMap.set("L1_APPROVED", "PENDING FOR L2 APPROVAL");
    this.statusMap.set("APPROVED", "APPROVED");
    this.statusMap.set("MODIFICATION_REQUIRED", "NEED MODIFICATION");
  }

  ngOnInit(): void {}

  getStatus() {
    return this.statusMap.get(this.contract.status) != null
      ? this.statusMap.get(this.contract.status)
      : this.contract.status;
  }
  renewContract() {
    this.renewEmitter.emit(this.contract);
  }
  edit() {
    this.editEmitter.emit(this.contract);
  }
  onDelete() {
    this.delete.emit(this.contract);
  }
  viewPo() {
    this.service.viewPo(this.contract._id);
  }
  downloadConract() {
    this.service.getReport(this.contract._id).subscribe();
  }

  isDownloadPdfButtonDisabled() {
    return !(
      this.role.hasContractApprover() ||
      (this.role.hasView() && "APPROVED" == this.contract.status)
    );
  }

  hideEdit() {
    return !(this.contract.status == "APPROVED" && this.role.hasEdit);
  }

  isApproveNotAllowed() {
    if (this.contract.status == "L1_APPROVED") {
      return !this.role.has("contract_L2_approver");
    }
    if (this.contract.status == "PENDING") {
      return !this.role.hasContractApprover();
    }
    return (
      this.contract.status == "APPROVED" ||
      this.contract.status == "MODIFICATION_REQUIRED"
    );
  }

  hideDelete() {
    return !this.role.hasDelete();
  }

  primaryAction() {
    if (
      this.contract.status == "PENDING" ||
      this.contract.status == "L1_APPROVED"
    ) {
      this.approveContract();
    } else if (this.contract.status == "MODIFICATION_REQUIRED") {
      return this.edit();
    } else if (this.contract.status == "APPROVED") {
      this.renewContract();
    }
  }

  approveContract() {
    let req = {
      _id: this.contract._id,
      comment: this.comment.value,
      action: true,
    };
    this.service.approve(req).subscribe((c: ContractModel) => {
      this.contract.status = c.status;
    });
  }
  declineContract() {
    let req = {
      _id: this.contract._id,
      comment: this.comment.value,
      action: false,
    };
    this.service.approve(req).subscribe((c: ContractModel) => {
      this.contract.status = c.status;
    });
  }

  getPrimaryActionButtonName() {
    if (this.contract.status == "APPROVED") {
      return "Renew";
    }
    if (this.contract.status == "MODIFICATION_REQUIRED") {
      return " Edit ";
    }
    return "Approve";
  }

  getPrimaryMiniButtonName() {
    if (this.contract.status == "PENDING") {
      return "thumb_up_alt";
    }
    if (this.contract.status == "MODIFICATION_REQUIRED") {
      return "edit";
    }
    return "autorenew";
  }

  isPrimaryButtonDisabled() {
    if (this.contract.status == "PENDING") {
      return !this.role.hasContractApprover() || !this.comment.valid;
    }
    if (this.contract.status == "L1_APPROVED") {
      return !this.role.has("contract_L2_approver") || !this.comment.valid;
    }
    return !this.role.hasEdit();
  }
}
