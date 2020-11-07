import { Injectable } from "@angular/core";
import { PnsHttpService } from "./pns-http.service";
import { Observable, Subject } from "rxjs";
import { AlertService } from "../alert.service";

@Injectable({
  providedIn: "root",
})
export class LeaveService {
  private baseUrl = "/pns/leave";
  private refreshSubject = new Subject();
  constructor(
    private http: PnsHttpService,
    private alertService: AlertService
  ) {}

  public refresh() {
    this.refreshSubject.next(null);
  }

  public getRefreshSubscriber(): Observable<any> {
    return this.refreshSubject.asObservable();
  }

  public count(start: any, end: any) {
    return new Observable((observer) => {
      this.http
        .get(`${this.baseUrl}/count?start=${start}&end=${end}`, true)
        .subscribe((res: any) => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  public getHolidayCalendar() {
    return new Observable((observer) => {
      this.http.get(`${this.baseUrl}/calendar`, true).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
      });
    });
  }

  public getLeaveQuota() {
    return new Observable((observer) => {
      this.http.get(`${this.baseUrl}/quota`, true).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
      });
    });
  }

  public getLeaveHistory() {
    return new Observable((observer) => {
      this.http.get(`${this.baseUrl}/history`, true).subscribe((res: any) => {
        observer.next(res);
        observer.complete();
      });
    });
  }

  public applyLeave(req: any) {
    return new Observable((observer) => {
      this.http.post(`${this.baseUrl}/apply`, req).subscribe((res: any) => {
        this.alertService
          .openDiaolog("Leave Applied Successfully!!")
          .afterClosed()
          .subscribe((resp) => {
            observer.next(resp);
            observer.complete();
          });
      });
    });
  }
}
