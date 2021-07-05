import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/models/seccion.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-captura-persona',
  templateUrl: './captura-persona.component.html',
  styleUrls: ['./captura-persona.component.css']
})
export class CapturaPersonaComponent implements OnInit {

  secciones:Seccion[]
  constructor(
    private apiService: ApiService,
    private auth: AuthService
  ) {
    this.secciones = [];
    this.obtenerSecciones();
  }

  ngOnInit(): void {
  }

  obtenerSecciones(){
    this.apiService.obtenerSecciones().subscribe( data => {
      this.secciones = data;
    }, error => {
    });
  }

}
