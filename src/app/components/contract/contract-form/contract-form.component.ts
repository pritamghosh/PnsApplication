import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ContractService } from "src/app/services/contract.service";
import { EquipmentModel } from "src/app/models/equipment.model ";
import { environment } from "src/environments/environment";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FindCustomerComponent } from "./find-customer/find-customer.component";
import { FindEquipmentComponent } from "./find-equipment/find-equipment.component";

@Component({
  selector: "app-contract-form",
  templateUrl: "./contract-form.component.html",
  styleUrls: ["./contract-form.component.scss"],
})
export class ContractFormComponent implements OnInit {
  @Input("isRenew") isRenew: boolean;
  calculate = true;

  contractForm: FormGroup;
  constructor(private service: ContractService, public dialog: MatDialog) {
    this.contractForm = new FormGroup({
      customer: new FormGroup({
        name: new FormControl(null, [Validators.required]),
        region: new FormControl(null, [Validators.required]),
        _id: new FormControl(null, [Validators.required]),
      }),
      equipmentItem: new FormGroup({
        equipment: new FormGroup({
          model: new FormControl(null, [Validators.required]),
          description: new FormControl(null),
          _id: new FormControl(null, [Validators.required]),
        }),
        _id: new FormControl(null),
        serialNumber: new FormControl(null, [Validators.required]),
      }),
      amcStartDate: new FormControl(null, [Validators.required]),
      amcEndDate: new FormControl(null, [Validators.required]),
      amcBasicAmount: new FormControl(null, [Validators.required]),
      amcTotalAmount: new FormControl(null, [Validators.required]),
      amcTax: new FormControl(environment.tax, [Validators.required]),
      billingCycle: new FormControl(null, [Validators.required]),
      note: new FormControl(null),
    });

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
  ngOnInit(): void {}

  onSubmit() {
    this.service
      .add(this.contractForm.value)
      .subscribe((resp) => this.contractForm.reset());
  }

  onReset() {
    this.contractForm.reset();
  }

  findCustomer() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = {};
    const dialogRef = this.dialog.open(FindCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((resp) => {
      if (!dialogConfig.data.cancelled && dialogConfig.data.customer != null) {
        this.contractForm.get("customer").setValue(dialogConfig.data.customer);
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
