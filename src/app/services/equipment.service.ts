import { Injectable } from "@angular/core";
import { AlertService } from "../alert.service";
import { Observable } from "rxjs";
import { PnsHttpService } from "./pns-http.service";

@Injectable({
  providedIn: "root",
})
export class EquipmentService {
  baseUrl = "/pns/equipment";
  constructor(
    private http: PnsHttpService,
    private alertService: AlertService
  ) {}
  add(req: any) {
    return new Observable((observer) => {
      this.http.put(this.baseUrl, req).subscribe((resp: any) => {
        this.alertService
          .openDiaolog("Equipment Added Successfully!!")
          .afterClosed()
          .subscribe((resp) => {
            observer.next(resp);
            observer.complete();
          });
      });
    });
  }

  update(req: any) {
    return new Observable((observer) => {
      this.http.post(this.baseUrl, req).subscribe((res: any) => {
        this.alertService
          .openDiaolog("Equipment Updated Successfully!!")
          .afterClosed()
          .subscribe((resp) => {
            observer.next(res);
            observer.complete();
          });
      });
    });
  }

  public get(reqUrl: any) {
    return new Observable((observer) => {
      this.http.get(`${this.baseUrl}${reqUrl}`).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
      });
    });
  }

  public delete(id: string) {
    return new Observable((observer) => {
      this.http.delete(`${this.baseUrl}/${id}`).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
      });
    });
  }
}
