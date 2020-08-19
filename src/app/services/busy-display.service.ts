import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BusyDisplayService {
  showBusyDisplaySubject = new Subject<boolean>();

  show() {
    this.showBusyDisplaySubject.next(true);
  }

  hide() {
    this.showBusyDisplaySubject.next(false);
  }
  constructor() {}
}
