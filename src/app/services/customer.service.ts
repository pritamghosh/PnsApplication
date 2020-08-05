import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertService } from "../alert.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient, private alertService: AlertService) {}
  baseUrl = "/pns/customer";

  public add(req: any) {
    this.http.put(this.baseUrl, req).subscribe((resp: any) => {
      this.alertService.openDiaolog("Customer Added Successfully!!");
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
