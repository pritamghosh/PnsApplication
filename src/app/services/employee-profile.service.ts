import { Injectable } from "@angular/core";
import { PnsHttpService } from "./pns-http.service";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EmployeeProfileModel } from "../models/employee.profile.model";

@Injectable({
  providedIn: "root",
})
export class EmployeeProfileService {
  constructor(private http: PnsHttpService, private _snackBar: MatSnackBar) {}
  baseUrl = "/pns/employee/profile";

  profile: EmployeeProfileModel;

  setProfile(profile: EmployeeProfileModel) {
    this.profile = profile;
  }

  public create(req: any) {
    return new Observable((observer) => {
      this.http.post(this.baseUrl, req).subscribe((resp: any) => {
        this._snackBar.open("Profile Created Successfully", "x", {
          duration: 3000,
        });
        observer.next(resp);
        observer.complete();
      });
    });
  }

  public getProfile(busydiplayhide?: boolean) {
    return new Observable((observer) => {
      this.http.get(this.baseUrl, busydiplayhide).subscribe((resp: any) => {
        this.profile = resp;
        observer.next(resp);
        observer.complete();
      });
    });
  }

  public getProfileByid(id: string, busydiplayhide?: boolean) {
    return new Observable((observer) => {
      this.http
        .get(`${this.baseUrl}/${id}`, busydiplayhide)
        .subscribe((resp: any) => {
          observer.next(resp);
          observer.complete();
        });
    });
  }

  public searchManager(key: string, busydiplayhide?: boolean) {
    return new Observable((observer) => {
      this.http
        .get(`${this.baseUrl}/search/manager?query=${key}`, busydiplayhide)
        .subscribe((resp: any) => {
          this.profile = resp;
          observer.next(resp);
          observer.complete();
        });
    });
  }

  public search(url: string, busydiplayhide?: boolean) {
    return new Observable((observer) => {
      this.http
        .get(`${this.baseUrl}/${url}`, busydiplayhide)
        .subscribe((resp: any) => {
          this.profile = resp;
          observer.next(resp);
          observer.complete();
        });
    });
  }

  public uploadImage(image: File) {
    return new Observable((observer) => {
      const formData = new FormData();
      formData.append("image", image);
      this.http
        .patch(`${this.baseUrl}/image`, formData)
        .subscribe((resp: any) => {
          observer.next(resp);
          observer.complete();
        });
    });
  }
}
