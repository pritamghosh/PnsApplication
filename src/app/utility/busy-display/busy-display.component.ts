import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { BusyDisplayService } from "src/app/services/busy-display.service";

@Component({
  selector: "app-busy-display",
  templateUrl: "./busy-display.component.html",
  styleUrls: ["./busy-display.component.scss"],
})
export class BusyDisplayComponent implements OnInit, OnDestroy {
  constructor(private service: BusyDisplayService) {}
  subscription: Subscription;
  showBusiDisplay = false;
  ngOnInit(): void {
    this.subscription = this.service.showBusyDisplaySubject
      .asObservable()
      .subscribe((resp) => {
        console.log(this.showBusiDisplay);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
