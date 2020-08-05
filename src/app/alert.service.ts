import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AlertComponent } from "./utility/alert/alert.component";
@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  openDiaolog(msg: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      msg: msg,
      buttonName: "Ok",
    };

    return this.dialog.open(AlertComponent, dialogConfig);
  }
}
