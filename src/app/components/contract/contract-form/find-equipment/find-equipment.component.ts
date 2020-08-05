import { Component, OnInit, Inject } from "@angular/core";
import { EquipmentModel } from "src/app/models/equipment.model ";
import { EquipmentService } from "src/app/services/equipment.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-find-equipment",
  templateUrl: "./find-equipment.component.html",
  styleUrls: ["./find-equipment.component.scss"],
})
export class FindEquipmentComponent implements OnInit {
  searchKeyControl = new FormControl(null, Validators.required);
  equipmentResp: EquipmentModel[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FindEquipmentComponent>,
    private service: EquipmentService
  ) {}

  ngOnInit(): void {}

  onSelection(selected: any[]) {
    if (selected != null) {
      this.data.equipment = selected[0].value;
    }
  }

  search() {
    this.service
      .get(`/search?query=${this.searchKeyControl.value}`)
      .subscribe((res: EquipmentModel[]) => {
        this.equipmentResp = res;
      });
  }
}
