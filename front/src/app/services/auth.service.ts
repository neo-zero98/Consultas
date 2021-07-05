import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private route:Router
  ) { }

  login(email:string,password:string){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential:any) => {
      if(this.isSuperUser(userCredential.user)){
        localStorage.setItem("super_usuario",userCredential.user.email);
      }
      localStorage.setItem("token",userCredential.user.za);
      this.route.navigate(['/captura']);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  refreshToken(){
    firebase.auth().currentUser.getIdToken(true)
    .then((idToken) => {
      localStorage.setItem('token',idToken);
    }).catch(function(error) {
    });
  }

  logout(){
    firebase.auth().signOut().then(() => {
      if(localStorage.getItem('super_usuario')){
        localStorage.removeItem('super_usuario');
      }
      localStorage.removeItem("capturista");
      localStorage.removeItem("token");
      this.route.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    });
  }

  isLogIn(){
    return localStorage.getItem('super_usuario') !== null? true:false;
  }

  isSuperUser(user:any):boolean{
    return (user.email === 'tescorporations@gmail.com') || (user.email === 'maydemsinaikarol@gmail.com') ? true:false;
  }


}
