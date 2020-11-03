import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DomainService {
  private currentDomain = "";

  setCurrentDomain(domain: any) {
    this.currentDomain = domain;
  }

  getCurrentDomain() {
    return this.currentDomain;
  }
  constructor() {}
}
