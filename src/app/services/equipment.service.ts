import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "../alert.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EquipmentService {
  baseUrl = "/pns/equipment";
  constructor(private http: HttpClient, private alertService: AlertService) {}
  add(req: any) {
    this.http.put(this.baseUrl, req).subscribe((resp: any) => {
      this.alertService.openDiaolog("Equipment Added Successfully!!");
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
}
