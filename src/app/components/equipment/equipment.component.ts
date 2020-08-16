import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { EquipmentModel } from "src/app/models/equipment.model ";
import { EquipmentService } from "src/app/services/equipment.service";

@Component({
  selector: "app-equipment",
  templateUrl: "./equipment.component.html",
  styleUrls: ["./equipment.component.scss"],
})
export class EquipmentComponent implements OnInit {
  @ViewChild("form") fromElement: NgForm;
  selectedTab = 0;
  isSearched = false;
  editTabShow = false;
  equipmentForm: FormGroup;
  equipmentEditForm: FormGroup;
  equipmentResp: EquipmentModel[];
  seachKeyControl = new FormControl(null, [Validators.required]);
  pageCount = 0;
  url = "";
  page = 1;
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
    this.equipmentEditForm = new FormGroup({
      model: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
  }
  onEdit(equipment: EquipmentModel) {
    this.equipmentEditForm = new FormGroup({
      model: new FormControl(equipment.model, [Validators.required]),
      _id: new FormControl(equipment._id, [Validators.required]),
      description: new FormControl(equipment.description),
    });
    this.editTabShow = true;
    this.selectedTab = 2;
  }

  onAdd() {
    this.service.add(this.equipmentForm.value).subscribe((resp) => {
      this.fromElement.resetForm();
    });
  }

  onUpdate() {
    this.service.update(this.equipmentEditForm.value).subscribe((resp: any) => {
      this.equipmentResp.forEach((element) => {
        if (element._id == resp._id) {
          element.model = resp.model;
          element.description = resp.description;
        }
      });
      this.editTabShow = false;
      this.selectedTab = 0;
    });
  }

  onReset() {
    this.equipmentForm.reset();
  }

  onCancel() {
    this.editTabShow = false;
    this.selectedTab = 0;
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
      case "all": {
        url = `${url}?`;
        break;
      }
    }
    this.url = url;
    this.getServiceCall(this.url);
  }

  getServiceCall(url: String, pageNo?: number) {
    this.service.get(url).subscribe((res: any) => {
      this.equipmentResp = res.result;
      this.isSearched = true;
      this.pageCount = res.pageCount;
      this.page = res.pageCount > 0 ? (pageNo > 0 ? pageNo : 0) : 0;
    });
  }
  changePage(pageNo: any) {
    this.getServiceCall(`${this.url}&page=${pageNo}`, pageNo);
  }
}
