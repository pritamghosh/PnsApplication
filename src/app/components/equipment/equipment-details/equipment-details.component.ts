import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { EquipmentModel } from "src/app/models/equipment.model ";
import { Router } from "@angular/router";

@Component({
  selector: "app-equipment-details",
  templateUrl: "./equipment-details.component.html",
  styleUrls: ["./equipment-details.component.scss"],
})
export class EquipmentDetailsComponent implements OnInit {
  @Input("equipments") equipments: EquipmentModel[];
  @Output() edit: EventEmitter<EquipmentModel> = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewContracts(equipment: EquipmentModel) {
    this.router.navigate(["contract"], {
      queryParams: { equipmentId: equipment._id },
    });
  }
  OnDelete(equipment: EquipmentModel) {}
  OnEdit(equipment: EquipmentModel) {
    this.edit.emit(equipment);
  }
}
