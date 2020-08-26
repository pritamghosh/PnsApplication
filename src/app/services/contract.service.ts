import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { AlertService } from "../alert.service";
import { Observable } from "rxjs";
import { PnsHttpService } from "./pns-http.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  baseUrl = "/pns/contract";
  constructor(
    private http: PnsHttpService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar
  ) {}

  public add(req: any, isrenew?: boolean) {
    return new Observable((observer) => {
      this.http.put(this.baseUrl, req).subscribe((res: any) => {
        this.alertService
          .openDiaolog(
            isrenew
              ? "Contract Renewed Successfully!!"
              : "Contract Added Successfully!!"
          )
          .afterClosed()
          .subscribe((resp) => {
            observer.next(res);
            observer.complete();
          });
      });
    });
  }

  public update(req: any) {
    return new Observable((observer) => {
      this.http.post(this.baseUrl, req).subscribe((res: any) => {
        this._snackBar.open("Contract  Update Successfully", "x", {
          duration: 3000,
        });
        observer.next(res);
        observer.complete();
      });
    });
  }

  public getReport(id: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/pdf");
    return new Observable((observer) => {
      this.http
        .get(`${this.baseUrl}/pdf/${id}`, false, {
          headers: headers,
          responseType: "blob",
        })
        .subscribe((res: any) => {
          let fileURL = URL.createObjectURL(res);
          window.open(fileURL);
          window.URL.revokeObjectURL(fileURL);
          observer.next(res);
          observer.complete();
        });
    });
  }

  public get(reqUrl: any, busyDisplayHide?: boolean) {
    return new Observable((observer) => {
      this.http
        .get(`${this.baseUrl}${reqUrl}`, busyDisplayHide)
        .subscribe((res: any) => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  public delete(id: string) {
    return new Observable((observer) => {
      if (window.confirm("Are You Sure To Delete This Contract")) {
        this.http.delete(`${this.baseUrl}/${id}`).subscribe((res: any) => {
          observer.next(res);
          observer.complete();
        });
      } else {
        observer.complete();
      }
    });
  }

  public approve(id: string) {
    return new Observable((observer) => {
      this.http.patch(`${this.baseUrl}/approve/${id}`).subscribe((res: any) => {
        this._snackBar.open("Contract  Approved Successfully", "x", {
          duration: 3000,
        });
        observer.next(res);
        observer.complete();
      });
    });
  }

  viewPo(id: string) {
    this.get(`/${id}`).subscribe((contract: any) => {
      const raw = window.atob(contract.poFileContent);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      let blob = new Blob([uInt8Array], { type: contract.poFileContentType });
      let fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
      window.URL.revokeObjectURL(fileURL);
    });
  }
}
