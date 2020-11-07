import { Component, OnInit } from "@angular/core";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  profile: EmployeeProfileModel;
  hrProfile: EmployeeProfileModel;
  rmProfile: EmployeeProfileModel;
  constructor(private service: EmployeeProfileService) {}

  ngOnInit(): void {
    this.profile = this.service.profile;
    if (this.profile != null) {
      if (this.profile.hrManager != null) {
        this.popupateHr();
      }
      if (this.profile.reportingManager != null) {
        this.popupateRm();
      }
    }

    this.service
      .getProfile(this.profile != null)
      .subscribe((p: EmployeeProfileModel) => {
        this.profile = p;
        if (this.rmProfile == null) {
          this.popupateRm();
        }
        if (this.hrProfile == null) {
          this.popupateHr();
        }
      });
  }
  popupateHr() {
    this.service
      .getProfileByid(this.profile.hrManager.employeeId, true)
      .subscribe((p: EmployeeProfileModel) => {
        this.hrProfile = p;
      });
  }
  popupateRm() {
    this.service
      .getProfileByid(this.profile.reportingManager.employeeId, true)
      .subscribe((p: EmployeeProfileModel) => {
        this.rmProfile = p;
      });
  }
}
