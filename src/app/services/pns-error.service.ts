import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { BusyDisplayService } from "./busy-display.service";
import { AlertComponent } from "../utility/alert/alert.component";

@Injectable({
  providedIn: "root",
})
export class PnsErrorService implements ErrorHandler {
  constructor(
    private injector: Injector,
    private ngzone: NgZone,
    private busyDisplayService: BusyDisplayService
  ) {}

  handleError(error: HttpErrorResponse) {
    console.error(error);
    this.ngzone.run(() => {
      this.busyDisplayService.hide();
    });
    if (
      error.error != null &&
      error.error.message != null &&
      error.error.message != ""
    ) {
      this.ngzone.run(() => {
        this.openDialog(error.error);
      });
    }
  }

  openDialog(error: any): void {
    let dialog: MatDialog = this.injector.get(MatDialog);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      msg: error.message,
      buttonName: "Ok",
    };
    dialog.open(AlertComponent, dialogConfig);
  }
}
