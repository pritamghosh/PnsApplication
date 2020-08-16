import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertService } from "../alert.service";
import { Observable } from "rxjs";
import { log } from "util";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  baseUrl = "/pns/contract";
  constructor(private http: HttpClient, private alertService: AlertService) {}

  public add(req: any, isrenew?: boolean) {
    return new Observable((observer) => {
      let headers = new HttpHeaders();
      headers = headers.set("Accept", "application/pdf");
      this.http
        .put(this.baseUrl, req, {
          headers: headers,
          responseType: "blob",
        })
        .subscribe((res: any) => {
          this.alertService
            .openDiaolog(
              isrenew
                ? "Contract Renewed Successfully!!"
                : "Contract Added Successfully!!"
            )
            .afterClosed()
            .subscribe((resp) => {
              let fileURL = URL.createObjectURL(res);
              observer.next(res);
              observer.complete();
              window.open(fileURL);
            });
        });
    });
  }

  public update(req: any) {
    return new Observable((observer) => {
      this.http.post(this.baseUrl, req).subscribe((res: any) => {
        this.alertService
          .openDiaolog("Contract Update Successfully!!")
          .afterClosed()
          .subscribe((resp) => {
            observer.next(res);
            observer.complete();
          });
      });
    });
  }

  public getReport(id: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/pdf");
    return new Observable((observer) => {
      this.http
        .get(`${this.baseUrl}/pdf/${id}`, {
          headers: headers,
          responseType: "blob",
        })
        .subscribe((res: any) => {
          let fileURL = URL.createObjectURL(res);
          window.open(fileURL);
          observer.next(res);
          observer.complete();
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
