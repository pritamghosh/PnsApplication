import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EquipmentModel } from "src/app/models/equipment.model ";
import { EquipmentService } from "src/app/services/equipment.service";

@Component({
  selector: "app-equipment",
  templateUrl: "./equipment.component.html",
  styleUrls: ["./equipment.component.scss"],
})
export class EquipmentComponent implements OnInit {
  selectedTab = 0;
  isSearched = false;
  equipmentForm: FormGroup;
  equipmentResp: EquipmentModel[];
  seachKeyControl = new FormControl(null, [Validators.required]);
  searchOption = [
    {
      value: "Find All",
      type: "all",
      searchFieldName: "Keep It Blank",
      searchButtonName: "Find All",
    },
    {
      value: "Find By Model",
      type: "byModel",
      searchFieldName: "Enter Equipment Model ",
      searchButtonName: "Find By Model",
    },
    {
      value: "Search Equipment",
      type: "search",
      searchFieldName: "Enter Key for Searching",
      searchButtonName: "Search",
    },
  ];

  selectedOption = this.searchOption[0];
  constructor(private service: EquipmentService) {}

  ngOnInit(): void {
    this.equipmentForm = new FormGroup({
      model: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
  }

  onSubmit() {
    this.service.add(this.equipmentForm.value);
  }

  onReset() {
    this.equipmentForm.reset();
  }

  isSeachButtonDisabled() {
    return this.selectedOption.type != "all" && !this.seachKeyControl.valid;
  }

  isSeachFieldDisabled() {
    if (this.selectedOption.type == "all") {
      this.seachKeyControl.reset();
      return true;
    }
    return false;
  }

  findEquipment() {
    let url = "";
    switch (this.selectedOption.type) {
      case "byModel": {
        url = `${url}?model=${this.seachKeyControl.value}`;
        break;
      }
      case "search": {
        url = `${url}/search?query=${this.seachKeyControl.value}`;
        break;
      }
    }
    this.service.get(url).subscribe((res: EquipmentModel[]) => {
      this.equipmentResp = res;
      this.isSearched = true;
    });
  }
}
