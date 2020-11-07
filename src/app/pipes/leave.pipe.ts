import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "leave",
})
export class LeavePipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    switch (value) {
      case "CL":
        return "Casual Leave";
      case "PL":
        return "Privilleged Leave";
      case "SL":
        return "Sick Leave";
      case "LOP":
        return "Loss of Pay";
      default:
        return value;
    }
    return null;
  }
}
