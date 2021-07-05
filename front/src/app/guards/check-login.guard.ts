import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(
    private route:Router
  ){}
  canActivate(): boolean {

      if(localStorage.getItem('token')!==null){
        return true;
      }else{
        this.route.navigateByUrl('/login');
        return false;
      }
  }

}
