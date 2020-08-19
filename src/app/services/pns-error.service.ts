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
    this.ngzone.run(() => {
      this.busyDisplayService.hide();
    });
    console.error(error);
    if (error.status != null && (error.status == 403 || error.status == 401)) {
      this.showErrorMessage(
        "Unable to Perform the Action Beacuse of Insufficient Privileges!"
      );
    } else if (error.status != null && error.status == 400) {
      this.showErrorMessage("Invalid Request!");
    } else if (
      error.error != null &&
      error.error.message != null &&
      error.error.message != ""
    ) {
      this.ngzone.run(() => {
        this.openDialog(error.error.message);
      });
    }
  }
  showErrorMessage(msg: any) {
    this.ngzone.run(() => {
      this.openDialog(msg);
    });
  }
  openDialog(message: any): void {
    let dialog: MatDialog = this.injector.get(MatDialog);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      msg: message,
      buttonName: "Ok",
    };
    dialog.open(AlertComponent, dialogConfig);
  }
}
