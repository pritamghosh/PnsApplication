import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { ContractService } from "src/app/services/contract.service";
import { EquipmentModel } from "src/app/models/equipment.model ";
import { environment } from "src/environments/environment";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FindCustomerComponent } from "./find-customer/find-customer.component";
import { FindEquipmentComponent } from "./find-equipment/find-equipment.component";
import { ContractModel } from "src/app/models/contract.model ";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-contract-form",
  templateUrl: "./contract-form.component.html",
  styleUrls: ["./contract-form.component.scss"],
})
export class ContractFormComponent implements OnInit {
  @ViewChild("form") fromElement: NgForm;
  @Input("isRenew") isRenew: boolean;
  @Input("contract") contract: ContractModel;
  @Output("action") submitEmitter = new EventEmitter();
  @Output("secondAction") secondActionEmitter = new EventEmitter();
  @Input("secondButtonColor") secondButtonColor: string;
  @Input("secondButtonName") secondButtonName: string;
  @Input("actionButtonName") actionButtonName: string;
  @Input("title") title: string;

  calculate = true;

  contractForm: FormGroup;
  constructor(
    private service: ContractService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.contractForm = new FormGroup({
      customer: new FormGroup({
        name: new FormControl({ disabled: true, value: null }, [
          Validators.required,
        ]),
        region: new FormControl({ disabled: true, value: null }, [
          Validators.required,
        ]),
        address: new FormControl(null, [Validators.required]),
        pan: new FormControl(null, [Validators.required]),
        gstinNo: new FormControl(null, [Validators.required]),
        _id: new FormControl(null, [Validators.required]),
      }),
      equipmentItem: new FormGroup({
        equipment: new FormGroup({
          model: new FormControl({ disabled: true, value: null }, [
            Validators.required,
          ]),
          description: new FormControl(null),
          _id: new FormControl(null, [Validators.required]),
        }),
        _id: new FormControl(null),
        serialNumber: new FormControl({ disabled: this.isRenew, value: null }, [
          Validators.required,
        ]),
      }),
      _id: new FormControl(null),
      proposalNo: new FormControl(null),
      amcStartDate: new FormControl(null, [Validators.required]),
      amcEndDate: new FormControl(null, [Validators.required]),
      amcBasicAmount: new FormControl(null, [Validators.required]),
      amcTotalAmount: new FormControl(null, [Validators.required]),
      amcTax: new FormControl({ disabled: true, value: environment.tax }, [
        Validators.required,
      ]),
      billingCycle: new FormControl(null, [Validators.required]),
      note: new FormControl(null),
    });
    if (this.contract != undefined) {
      this.contractForm.patchValue(this.contract);
      if (this.isRenew) {
        let startdt: Date = new Date(this.contract.amcStartDate);
        let endtdt: Date = new Date(this.contract.amcEndDate);

        let duration =
          endtdt.getTime() / (86400 * 1000) -
          startdt.getTime() / (86400 * 1000);
        startdt.setTime(endtdt.getTime() + 86400 * 1000);
        endtdt.setTime(startdt.getTime() + duration * 86400 * 1000);

        this.contractForm.get("_id").setValue(null);
        this.contractForm.get("amcEndDate").setValue(endtdt);
        this.contractForm.get("amcStartDate").setValue(startdt);
      }
    }

    this.contractForm.get("amcBasicAmount").valueChanges.subscribe((val) => {
      if (this.contractForm.get("amcBasicAmount").valid && this.calculate) {
        this.calculate = false;
        this.contractForm
          .get("amcTotalAmount")
          .setValue(+val + (val * environment.tax) / 100);
      } else if (!this.calculate) {
        this.calculate = true;
      }
    });

    this.contractForm.get("amcTotalAmount").valueChanges.subscribe((val) => {
      if (this.contractForm.get("amcTotalAmount").valid && this.calculate) {
        this.calculate = false;
        this.contractForm
          .get("amcBasicAmount")
          .setValue(+val - (val * environment.tax) / (100 + environment.tax));
      } else if (!this.calculate) {
        this.calculate = true;
      }
    });
  }

  get minEndDate() {
    return this.contractForm.get("amcStartDate").value;
  }

  submitAction() {
    let contract = this.contractForm.value;
    contract.amcStartDate = this.datePipe.transform(
      contract.amcStartDate,
      "yyyy-MM-dd"
    );
    contract.amcEndDate = this.datePipe.transform(
      contract.amcEndDate,
      "yyyy-MM-dd"
    );
    this.submitEmitter.emit({
      contract: contract,
      form: this.fromElement,
    });
  }

  secondAction() {
    this.secondActionEmitter.emit({
      formGroup: this.contractForm,
      form: this.fromElement,
    });
  }

  findCustomer() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = {};
    const dialogRef = this.dialog.open(FindCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((resp) => {
      if (!dialogConfig.data.cancelled && dialogConfig.data.customer != null) {
        this.contractForm
          .get("customer")
          .patchValue(dialogConfig.data.customer);
      }
    });
  }

  findEquipment() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = {};
    const dialogRef = this.dialog.open(FindEquipmentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((resp) => {
      if (!dialogConfig.data.cancelled && dialogConfig.data.equipment != null) {
        let equipment = new EquipmentModel();
        equipment._id = dialogConfig.data.equipment._id;
        equipment.model = dialogConfig.data.equipment.model;
        equipment.description = dialogConfig.data.equipment.description;
        this.contractForm
          .get("equipmentItem")
          .get("equipment")
          .setValue(equipment);
      }
    });
  }
}
