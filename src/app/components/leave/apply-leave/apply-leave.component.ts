import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { ManagerModel } from "src/app/models/manager.model";
import { DatePipe } from "@angular/common";
import { LeaveService } from "src/app/services/leave.service";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";

@Component({
  selector: "app-apply-leave",
  templateUrl: "./apply-leave.component.html",
  styleUrls: ["./apply-leave.component.scss"],
})
export class ApplyLeaveComponent implements OnInit {
  leaveForm: FormGroup;
  @ViewChild("form") fromElement: NgForm;
  noOfDays = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  from = new FormControl(null, [Validators.required]);

  to = new FormControl(null, [Validators.required]);
  primaryAprrovers: ManagerModel[] = [];
  leaveTypes = ["CL", "PL", "SL"];
  constructor(
    private datePipe: DatePipe,
    private service: LeaveService,
    private profileService: EmployeeProfileService
  ) {}

  ngOnInit(): void {
    let type = new FormControl(null, [Validators.required]);
    this.leaveForm = new FormGroup({
      type: type,
      from: this.from,
      to: this.to,
      primaryApprover: new FormControl(null, [
        Validators.required,
        this.primaryApproverValid.bind(this),
      ]),
      // secondaryApprover: new FormControl(
      //   {
      //     value: null,
      //     disabled: !(type.value == "SL"),
      //   },
      //   Validators.required
      // ),
      note: new FormControl(null, [Validators.required]),
    });
    // type.valueChanges.subscribe((e) => {
    //   if (e == "SL") {
    //     this.leaveForm.get("secondaryApprover").enable();
    //   } else {
    //     this.leaveForm.get("secondaryApprover").reset();
    //     this.leaveForm.get("secondaryApprover").disable();
    //   }
    // });

    this.from.valueChanges.subscribe((e) => this.calculateNoOfDays());
    this.to.valueChanges.subscribe((e) => this.calculateNoOfDays());

    this.populatePrimaryApprover();
  }

  populatePrimaryApprover() {
    let profile = this.profileService.profile;
    if (profile != null && profile.reportingManager != null) {
      this.primaryAprrovers.push(profile.reportingManager);
    } else {
      this.profileService
        .getProfile(true)
        .subscribe((p: EmployeeProfileModel) => {
          this.primaryAprrovers.push(p.reportingManager);
        });
    }
  }

  calculateNoOfDays() {
    this.formToValidate();
    if (this.from.valid && this.to.valid) {
      const start = this.datePipe.transform(this.from.value, "yyyy-MM-dd");

      const end = this.datePipe.transform(this.to.value, "yyyy-MM-dd");

      this.service
        .count(start, end)
        .subscribe((val) => this.noOfDays.setValue(val));
    } else {
      this.noOfDays.setValue(null);
    }
  }

  primaryApproverValid(control: FormControl): { [s: string]: boolean } {
    for (let index = 0; index < this.primaryAprrovers.length; index++) {
      const element = this.primaryAprrovers[index];
      if (element.employeeId == control.value) {
        return null;
      }
    }
  }

  formToValidate() {
    if (this.from.value != null && this.to.value != null) {
      let formDate = new Date(this.from.value).getTime();
      let toDate = new Date(this.to.value).getTime();
      if (toDate < formDate) {
        this.from.setErrors({ invalidDate: true });

        this.to.setErrors({ invalidDate: true });
      } else {
        this.from.setErrors(null);
        this.to.setErrors(null);
      }
    }
  }

  apply() {
    const leaveApply = this.leaveForm.value;
    leaveApply.from = this.datePipe.transform(leaveApply.from, "yyyy-MM-dd");
    leaveApply.to = this.datePipe.transform(leaveApply.to, "yyyy-MM-dd");

    this.service.applyLeave(leaveApply).subscribe(() => {
      this.fromElement.reset();
      this.service.refresh();
    });
  }
}
