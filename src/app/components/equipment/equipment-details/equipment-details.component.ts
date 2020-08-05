import { Component, OnInit, Input } from "@angular/core";
import { EquipmentModel } from "src/app/models/equipment.model ";

@Component({
  selector: "app-equipment-details",
  templateUrl: "./equipment-details.component.html",
  styleUrls: ["./equipment-details.component.scss"],
})
export class EquipmentDetailsComponent implements OnInit {
  @Input("equipments") equipments: EquipmentModel[];
  constructor() {}

  ngOnInit(): void {}

  viewContracts(equipment: EquipmentModel) {}
  delete(equipment: EquipmentModel) {}
  edit(equipment: EquipmentModel) {}
}
