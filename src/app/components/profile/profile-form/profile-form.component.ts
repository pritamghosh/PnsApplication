import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";
import { environment } from "src/environments/environment";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";
import { ManagerModel } from "src/app/models/manager.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"],
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  @ViewChild("form") fromElement: NgForm;
  @Output("action") submitEmitter = new EventEmitter();
  @Output("secondAction") secondActionEmitter = new EventEmitter();
  @Input("secondButtonName") secondButtonName: string = "Reset";
  @Input("actionButtonName") actionButtonName: string = "Create";
  @Input("title") title: string = "Enter New Profile Details";
  today = new Date();
  bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  reportingMangers: ManagerModel[] = [];
  hrMangers: ManagerModel[] = [];
  rm = new FormControl();
  hm = new FormControl();
  isCreate = true;
  constructor(
    private datePipe: DatePipe,
    private service: EmployeeProfileService
  ) {}

  get designations() {
    return environment.designations;
  }

  getMangers(event: any) {
    this.service
      .searchManager(event, true)
      .subscribe((p: ManagerModel[]) => (this.reportingMangers = p));
  }

  getHrs(event: any) {
    this.service
      .searchManager(event, true)
      .subscribe((p: ManagerModel[]) => (this.hrMangers = p));
  }

  get baseLocations() {
    return environment.baseLocations;
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      _id: new FormControl(),
      employeeId: new FormControl(),
      firstName: new FormControl(null, [Validators.required]),
      middleName: new FormControl(),
      familyName: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      bloodGroup: new FormControl(),
      address: new FormControl(),
      industry: new FormControl(),
      designation: new FormControl(null, [Validators.required]),
      baseLocation: new FormControl(null, [Validators.required]),
      dateOfJoining: new FormControl(null, [Validators.required]),
      workEmail: new FormControl(null, [Validators.required, Validators.email]),
      mobileNo: new FormControl(null, [Validators.required]),
      workContactNo: new FormControl(),
      image: new FormControl(),
      reportingManager: new FormGroup({
        _id: new FormControl(null),
        name: new FormControl(null, [
          Validators.required,
          this.invalidRm.bind(this),
        ]),
        employeeId: new FormControl(),
      }),
      hrManager: new FormGroup({
        _id: new FormControl(null),
        name: new FormControl(null, [
          Validators.required,
          this.invalidHr.bind(this),
        ]),
        employeeId: new FormControl(),
      }),
    });
  }

  invalidHr(control: FormControl): { [s: string]: boolean } {
    for (let index = 0; index < this.hrMangers.length; index++) {
      const element = this.hrMangers[index];
      if (element.name == control.value) {
        this.profileForm.get("hrManager").get("_id").setValue(element._id);
        this.profileForm
          .get("hrManager")
          .get("employeeId")
          .setValue(element.employeeId);
        return null;
      }
    }
    return { invalidHr: true };
  }

  invalidRm(control: FormControl): { [s: string]: boolean } {
    for (let index = 0; index < this.reportingMangers.length; index++) {
      const element = this.reportingMangers[index];
      if (element.name == control.value) {
        this.profileForm
          .get("reportingManager")
          .get("_id")
          .setValue(element._id);
        this.profileForm
          .get("reportingManager")
          .get("employeeId")
          .setValue(element.employeeId);
        return null;
      }
    }
    return { invalidRm: true };
  }

  get secondButtonDisable() {
    return this.isCreate && this.profileForm.untouched;
  }

  submitAction() {
    let profileRaw = this.profileForm.getRawValue();
    const profile = this.profileForm.value;
    profileRaw.dateOfBirth = this.datePipe.transform(
      profile.dateOfBirth,
      "yyyy-MM-dd"
    );
    profileRaw.dateOfJoining = this.datePipe.transform(
      profile.dateOfJoining,
      "yyyy-MM-dd"
    );
    this.service.create(profileRaw).subscribe((p) => this.fromElement.reset());
  }

  secondAction() {
    this.fromElement.reset();
  }
}
