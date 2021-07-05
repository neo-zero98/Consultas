import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;
  form = this.fb.group({
    email: ['',[
      Validators.required,
      Validators.minLength(6),
      Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
    ]],
    password: ['',[
      Validators.required,
      Validators.minLength(6)
    ]]
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
  }

  login(){
    if(this.form.valid === false){
      this.usuario = new Usuario();
      return;
    }
    this.usuario.email = this.form.value.email;
    this.usuario.password = this.form.value.password;
    this.authService.login(this.usuario.email, this.usuario.password);
    this.usuario = new Usuario();
  }

}
