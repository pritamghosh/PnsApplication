import { Component, OnInit } from "@angular/core";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  profile: EmployeeProfileModel;
  constructor(private service: EmployeeProfileService) {}

  ngOnInit(): void {
    this.profile = this.service.profile;
    this.service
      .getProfile(this.profile != null)
      .subscribe((p: EmployeeProfileModel) => {
        this.profile = p;
      });
  }
}
