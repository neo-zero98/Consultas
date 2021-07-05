import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/models/seccion.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  secciones:Seccion[];
  constructor(
    private apiService: ApiService
  ) {
    this.obtenerSecciones();
  }

  ngOnInit(): void {
  }

  obtenerSecciones(){
    this.apiService.obtenerSecciones().subscribe( res => {
      this.secciones = res;
    })
  }


}
