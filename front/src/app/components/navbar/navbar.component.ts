import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  btnAdmin:boolean;

  constructor(
    private authService: AuthService,
    private router:Router
  ) {
    this.btnAdmin = this.authService.isLogIn();
  }

  ngOnInit(): void {
    this.validacionToken();
  }

  logOut(){
    this.authService.logout();
  }

  validacionToken(){
    setTimeout(() => {
      this.authService.refreshToken();
    }, 420000);
  }

  goToCaptura(){
    this.router.navigate(['/captura']);
  }

  goToGraficas(){
    this.router.navigate(['/graficas']);
  }


}
