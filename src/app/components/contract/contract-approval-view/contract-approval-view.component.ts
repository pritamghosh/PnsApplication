import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ContractModel } from "src/app/models/contract.model ";
import { ContractService } from "src/app/services/contract.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-contract-approval-view",
  templateUrl: "./contract-approval-view.component.html",
  styleUrls: ["./contract-approval-view.component.scss"],
})
export class ContractApprovalViewComponent implements OnInit {
  @Input("contracts") contracts: ContractModel[];
  @Output("edit") editEmitter = new EventEmitter();
  @Output("remove") removeEmitter = new EventEmitter();
  newContract: ContractModel;
  oldContract: ContractModel;
  statusMap: Map<string, string> = new Map();
  constructor(private service: ContractService) {
    this.statusMap.set("PENDING", "PENDING FOR L1 APPROVAL");
    this.statusMap.set("L1_APPROVED", "PENDING FOR L2 APPROVAL");
    this.statusMap.set("APPROVED", "APPROVED");
    this.statusMap.set("MODIFICATION_REQUIRED", "NEED MODIFICATION");
  }
  comment: FormControl = new FormControl(null, Validators.required);
  ngOnInit(): void {
    if (this.contracts != null) {
      this.newContract = this.contracts[0];
      if (this.contracts.length > 1) {
        this.oldContract = this.contracts[1];
      }
    }
  }

  get typeClass() {
    return this.oldContract == null ? "new" : "old";
  }

  get type() {
    return this.oldContract == null ? "New Contract" : "Exiting Contract";
  }
  get hideIcon() {
    return this.oldContract == null ? "hideIcon" : "showIcon";
  }
  get status() {
    return this.statusMap.get(this.newContract.status) != null
      ? this.statusMap.get(this.newContract.status)
      : this.newContract.status;
  }

  approve() {
    let req = {
      _id: this.newContract._id,
      comment: this.comment.value,
      action: true,
    };
    this.service.approve(req).subscribe((c) => {
      this.removeEmitter.emit(c);
    });
  }

  decline() {
    let req = {
      _id: this.newContract._id,
      comment: this.comment.value,
      action: false,
    };
    this.service.approve(req, true).subscribe((c) => {
      this.removeEmitter.emit(c);
    });
  }
  onDelete() {
    this.service.delete(this.newContract._id).subscribe((c) => {
      this.removeEmitter.emit(c);
    });
  }

  viewPo() {
    this.service.viewPo(this.newContract._id);
  }

  downloadConract() {
    this.service.getReport(this.newContract._id).subscribe();
  }
}
