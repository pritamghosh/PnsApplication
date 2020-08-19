import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BusyDisplayService } from "./busy-display.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PnsHttpService {
  constructor(
    private http: HttpClient,
    private busyDisplay: BusyDisplayService
  ) {}

  public put<T>(url: string, req: any, options?: any) {
    this.busyDisplay.show();
    return new Observable((observer) => {
      this.http.put<any>(url, req, options).subscribe((resp: any) => {
        this.busyDisplay.hide();
        observer.next(resp);
        observer.complete();
      });
    });
  }

  public post<T>(url: string, req: any, options?: any) {
    this.busyDisplay.show();
    return new Observable((observer) => {
      this.http.post<any>(url, req, options).subscribe((resp: any) => {
        this.busyDisplay.hide();
        this.busyDisplay.show();
        observer.next(resp);
        observer.complete();
      });
    });
  }

  public delete<T>(url: string) {
    return new Observable((observer) => {
      this.busyDisplay.show();
      this.http.delete<any>(url).subscribe((resp: any) => {
        this.busyDisplay.hide();
        observer.next(resp);
        observer.complete();
      });
    });
  }

  public get<T>(url: string, options?: any) {
    return new Observable((observer) => {
      this.busyDisplay.show();
      this.http.get<T>(url, options).subscribe((resp: any) => {
        this.busyDisplay.hide();
        observer.next(resp);
        observer.complete();
      });
    });
  }
}
