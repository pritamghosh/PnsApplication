import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { BusyDisplayService } from "./busy-display.service";

@Injectable({
  providedIn: "root",
})
export class PnsInterInterceptorService implements HttpInterceptor {
  constructor(private busyDisplay: BusyDisplayService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
