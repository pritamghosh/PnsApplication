import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "../alert.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  baseUrl = "/pns/contract";
  constructor(private http: HttpClient, private alertService: AlertService) {}

  public add(req: any) {
    this.http.put(this.baseUrl, req).subscribe((resp: any) => {
      this.alertService.openDiaolog("Contract Added Successfully!!");
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
