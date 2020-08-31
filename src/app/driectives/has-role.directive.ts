import { Directive, ElementRef, Input } from "@angular/core";
import { RoleService } from "../services/role.service";

@Directive({
  selector: "[appHasRole]",
})
export class HasRoleDirective {
  constructor(private element: ElementRef, private role: RoleService) {}
  @Input() set appHasRole(role: string) {
    this.element.nativeElement.hidden = !this.role.has(role);
  }
}
