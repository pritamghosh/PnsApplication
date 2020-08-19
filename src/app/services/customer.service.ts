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
    return new Observable((observer) => {
      this.http.put<any>(this.baseUrl, req).subscribe((resp: any) => {
        this.alertService
          .openDiaolog("Customer Added Successfully!!")
          .afterClosed()
          .subscribe((resp) => {
            observer.next(resp);
            observer.complete();
          });
      });
    });
  }

  public update(req: any) {
    return new Observable((observer) => {
      this.http.post<any>(this.baseUrl, req).subscribe((res: any) => {
        this.alertService
          .openDiaolog("Customer Updated Successfully!!")
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
      this.http.get<any>(`${this.baseUrl}${reqUrl}`).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
      });
    });
  }

  public delete(id: string) {
    return new Observable((observer) => {
      this.http.delete<any>(`${this.baseUrl}/${id}`).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
      });
    });
  }
}
