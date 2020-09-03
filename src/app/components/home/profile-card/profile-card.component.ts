import { Component, OnInit, Input } from "@angular/core";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";

@Component({
  selector: "app-profile-card",
  templateUrl: "./profile-card.component.html",
  styleUrls: ["./profile-card.component.scss"],
})
export class ProfileCardComponent implements OnInit {
  @Input("profile") profile: EmployeeProfileModel;
  constructor() {}

  ngOnInit(): void {}

  get image() {
    if (this.profile?.image != null) {
      return "data:image/bmp;base64," + this.profile?.image;
    }
    return null;
  }

  get name() {
    return (
      this.profile.firstName +
      (this.profile.middleName != null ? " " + this.profile?.middleName : "") +
      " " +
      this.profile.familyName
    );
  }

  get initial() {
    return (
      "" +
      this.profile?.firstName.charAt(0) +
      this.profile?.familyName.charAt(0)
    );
  }
}
