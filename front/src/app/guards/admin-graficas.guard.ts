import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGraficasGuard implements CanActivate {
  constructor(
    private route:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //aqui se agrega el correo de los usuarios
      if(localStorage.getItem('super_usuario') === 'tescorporations@gmail.com' || localStorage.getItem('super_usuario') === 'maydemsinaikarol@gmail.com'){
        return true;
      }else{
        this.route.navigateByUrl('/');
        return false;
      }
  }

}
