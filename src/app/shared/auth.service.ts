import {CanLoad, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

export interface Manager {
  managername: string;
  password: string;
}

export class manager_AuthService {
  public loginManager: Manager;
  constructor() {}
}

export interface User {
  username: string;
  password: string;
}

export class user_AuthService {
  public loginUser: User;
  constructor() {}
}


@Injectable()

export class managerCanLoadGuard implements CanLoad {
  constructor(private mAService:manager_AuthService, private uAService:user_AuthService, private router:Router) {}
  canLoad(route: Route): Observable<boolean> | boolean {
    if (this.mAService.loginManager || this.uAService.loginUser) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

export interface ComponentCanDeactivate {
  canDeactivate():boolean | Observable<boolean>;
}

@Injectable()
export class UserCanDeactivateGuard implements CanDeactivate<any>{
  canDeactivate(component: ComponentCanDeactivate):boolean | Observable<boolean>{
    return component.canDeactivate?component.canDeactivate():true;
  }
}
