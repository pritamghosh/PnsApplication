import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-domain-dialog",
  templateUrl: "./domain-dialog.component.html",
  styleUrls: ["./domain-dialog.component.scss"],
})
export class DomainDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DomainDialogComponent>
  ) {}

  domains = environment.domains;
  ngOnInit(): void {}

  onSelection(selected: any) {
    if (selected != null) {
      this.data.isDomainChanged = !(selected == this.data.currentDomain);
      this.data.currentDomain = selected;
      this.dialogRef.close();
    }
  }
}
