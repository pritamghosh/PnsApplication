import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ManagerModel } from "src/app/models/manager.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-apply-leave",
  templateUrl: "./apply-leave.component.html",
  styleUrls: ["./apply-leave.component.scss"],
})
export class ApplyLeaveComponent implements OnInit {
  leaveForm: FormGroup;
  noOfDays = new FormControl({ value: null, disabled: true });
  primaryAprrovers: ManagerModel[] = [
    { _id: null, name: "Pritam Kumar Ghosh(pghosh)", employeeId: "pghosh" },
  ];
  secondaryApprovers: ManagerModel[] = [
    { _id: null, name: "Pritam Kumar Ghosh(pghosh)", employeeId: "pghosh" },
  ];
  leaveTypes = [
    { display: "Casual Leave", value: "CL" },
    { display: "Privilleged Leave", value: "PL" },
    { display: "Sick Leave", value: "SL" },
  ];
  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.leaveForm = new FormGroup(
      {
        type: new FormControl(null, [Validators.required]),
        from: new FormControl(null, [Validators.required]),
        to: new FormControl(null, [Validators.required]),
        primaryApprover: new FormControl(null, [
          Validators.required,
          this.primaryApproverValid.bind(this),
        ]),
        secondaryApprover: new FormControl(null),
        note: new FormControl(null, [Validators.required]),
      },
      this.secondaryApproverValid.bind(this)
    );
  }

  primaryApproverValid(control: FormControl): { [s: string]: boolean } {
    for (let index = 0; index < this.primaryAprrovers.length; index++) {
      const element = this.primaryAprrovers[index];
      if (element.employeeId == control.value) {
        return null;
      }
    }
  }
  secondaryApproverValid(control: FormControl): { [s: string]: boolean } {
    if (
      control?.get("type")?.value == "SL" &&
      control?.get("secondaryApprover")?.value == null
    ) {
      control?.get("secondaryApprover").setErrors({ required: true });
      return { secondaryApproverRequired: true };
    }
    if (control?.get("type")?.value != "SL") {
      control?.get("secondaryApprover")?.setErrors(null);
    }
    for (let index = 0; index < this.secondaryApprovers.length; index++) {
      const element = this.secondaryApprovers[index];
      if (element.employeeId == control?.get("secondaryApprover")?.value) {
        return null;
      }
    }
  }

  changeType(val: any) {
    console.log(val);
    this.leaveForm
      .get("secondaryApprover")
      .setValidators([
        Validators.required,
        this.secondaryApproverValid.bind(this),
      ]);
  }

  calculateDate() {
    let formVal = this.leaveForm.value;

    if (formVal.from != null && formVal.to != null) {
      let formDate = new Date(formVal.from).getTime() / (86400 * 1000);
      let toDate = new Date(formVal.to).getTime() / (86400 * 1000);
      this.noOfDays.setValue(toDate - formDate);
      if (toDate - formDate < 1) {
        this.leaveForm.get("from").setErrors({ invalidDate: true });
        this.leaveForm.get("to").setErrors({ invalidDate: true });
      }
    } else {
      this.noOfDays.setValue(null);
    }
  }

  apply() {
    console.log(this.leaveForm.get("secondaryApprover"));
  }
}
