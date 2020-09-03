import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-other-profile",
  templateUrl: "./other-profile.component.html",
  styleUrls: ["./other-profile.component.scss"],
})
export class OtherProfileComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  profile: EmployeeProfileModel;
  constructor(
    private service: EmployeeProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe((params) => {
      let id = params["id"];
      this.service.getProfileByid(id).subscribe((p: EmployeeProfileModel) => {
        this.profile = p;
      });
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }
}
