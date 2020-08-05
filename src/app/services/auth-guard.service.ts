import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from "@angular/router";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  isLoggedIn = true;
  constructor(private loginService: LoginService, private router: Router) {
    // this.isLoggedIn = this.loginService.isLoggedIn();
    // this.loginService.isLoggedInSubject
    //   .asObservable()
    //   .subscribe((isLoggedinParam) => {
    //     this.isLoggedIn = isLoggedinParam;
    //   });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLoggedIn) {
      return true;
    }
    this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    return true;
  }
}
