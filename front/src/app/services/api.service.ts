import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seccion } from '../models/seccion.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string;
  private headers:HttpHeaders;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.url = 'https://us-central1-consultas-12aab.cloudfunctions.net/app'; //produccion
    // this.url = 'http://localhost:5000/consultas-12aab/us-central1/app'; //local
    this.headers = new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  obtenerSecciones():Observable<Seccion[]>{
    return this.http.get<Seccion[]>(this.url+'/api/secciones', {headers:this.headers})
            .pipe(
              map((data:any) => {
                return data.data;
              })
            );
  }

  getSeccionById(id:string):Observable<Seccion>{
    return this.http.get<Seccion>(this.url+'/api/seccion/'+id, {headers:this.headers})
            .pipe(
              map((data:any) => {
                return data.data;
              })
            );
  }

  guardarPersona(persona:Persona):Observable<any>{
    return this.http.post(this.url+'/api/persona', persona ,{headers:this.headers})
            .pipe(
              map((data:any) => {
                return data;
              })
            );
  }

  getPersonas():Observable<Persona[]>{
    return this.http.get<Persona[]>(this.url+'/api/personas', {headers:this.headers})
    .pipe(
      map((data:any) => {
        return data.data;
      })
    );
  }

  getPersonsByDateAndSeccion(fechaSeccion:any):Observable<any>{
    return this.http.post(this.url+'/api/fecha_seccion', fechaSeccion ,{headers:this.headers})
    .pipe(
      map((data:any) => {
        return data.data;
      })
    );
  }

}
