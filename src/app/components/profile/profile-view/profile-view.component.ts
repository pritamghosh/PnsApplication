import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"],
})
export class ProfileViewComponent implements OnInit {
  opacity = 0;
  //image = "/assets/images/gitdp.jpg";

  profile: EmployeeProfileModel;

  imageFc = new FormControl();

  get image() {
    if (this.profile?.image != null) {
      return "data:image/bmp;base64," + this.profile?.image;
    }
    return null;
  }

  get name() {
    return (
      this.profile.firstName +
      " " +
      (this.profile.middleName != null ? " " + this.profile?.middleName : "") +
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
  constructor(private service: EmployeeProfileService) {}

  ngOnInit(): void {
    this.service.getProfile().subscribe((p: EmployeeProfileModel) => {
      this.profile = p;
    });
  }

  uploadImage(event: any) {
    let files = event.target.files;
    const reader = new FileReader();
    const file = files[0];
    this.imageFc.setValue(null);
    if (!file.type.match(/image.*/)) {
      window.alert("Please Upload Valid Image");
      return;
    }
    this.service
      .uploadImage(file)
      .subscribe((p: EmployeeProfileModel) => (this.profile = p));
  }
}
