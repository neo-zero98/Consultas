import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Direccion } from 'src/app/models/direccion.model';
import { Persona } from 'src/app/models/persona.model';
import { Seccion } from 'src/app/models/seccion.model';
import { ApiService } from 'src/app/services/api.service';
import { DireccionService } from 'src/app/services/direccion.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-formulario-persona',
  templateUrl: './formulario-persona.component.html',
  styleUrls: ['./formulario-persona.component.css']
})
export class FormularioPersonaComponent implements OnInit {

  @Input() secciones:Seccion[];
  direcciones:Direccion[];
  municipios:any;
  persona: Persona;
  localidad:string;
  form = this.fb.group({
    nombres: ['',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      // Validators.name
    ]],
    apellido_materno: ['',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      // Validators.name
    ]],
    apellido_paterno: ['',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      // Validators.name
    ]],
    sexo: ['', Validators.required],
    telefono: [null,[
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10)
    ]],
    direccion: ['', [
      Validators.required,
      Validators.minLength(6)
    ]],
    // direccion: this.fb.group({
    //   calle: ['',[
    //     Validators.required,
    //     Validators.minLength(5)
    //   ]],
    //   numero_interior: [,[
    //     Validators.required,
    //     Validators.min(0)
    //   ]],
    //   asentamiento: [null,Validators.required],
    //   cp: [,[
    //     Validators.minLength(5),
    //     Validators.required]],
    //   municipio: ['',Validators.required],
    //   estado: ['Tlaxcala'],
    //   pais: ['México']
    // }),
    seccion: [,Validators.required],
    fecha_registro: [null,[
      Validators.required
    ]],
    capturista: []
  });
  constructor(
    private fb: FormBuilder,
    private dirreccionService:DireccionService,
    private apiService: ApiService
  ) {
    this.persona = new Persona();
    this.direcciones = [];
    this.municipios = new Array();
    this.localidad = null;
  }

  ngOnInit(): void {
    // this.getCapturistaStorage();
  }

  // buscarPorCp(){
  //   this.direcciones = [];
  //   this.municipios = new Array();
  //   this.dirreccionService.serchByCP(this.form.value.direccion.cp).subscribe((data:any) => {
  //     data.forEach(element => {
  //       this.direcciones.push(element.response);
  //     });
  //     this.setMunicipio();
  //   });
  // }
  // setAsentamiento($event){
  //   this.form.get('direccion').get('asentamiento').setValue($event.target.value);
  // }
  // setMunicipio(){
  //   this.form.get('direccion').get('municipio').setValue(this.direcciones[0].municipio);
  // }
  // getCapturistaStorage(){
  //   if(localStorage.getItem('capturista')!== null){
  //     this.form.get('capturista').setValue(localStorage.getItem('capturista'));
  //   }
  // }
  // setCapturistaStorage(){
  //   if(this.form.value.capturista.length > 3){
  //     localStorage.setItem('capturista',this.form.value.capturista);
  //   }
  // }
  setSeccion($event){
    if(this.form.value.seccion){
      this.apiService.getSeccionById($event.target.value).subscribe( res => {
        this.localidad = res.localidad;
      })
    }
  }

  vaciarFormBuilder(){
    // this.setCapturistaStorage();
    this.form.reset();
    // this.getCapturistaStorage();
  }

  enviarFormulario(){
    if(this.form.valid === false){
      console.log("formulario no valido");
      return;
    }
    this.setearPersona();
    this.apiService.guardarPersona(this.persona).subscribe( res => {
      this.alert();
    })
    this.vaciarFormBuilder();
    console.log("validado");
  }

  setearPersona(){
    this.persona.id = 'prueba';
    this.persona.nombres = this.form.value.nombres;
    this.persona.apellido_paterno = this.form.value.apellido_paterno;
    this.persona.apellido_materno = this.form.value.apellido_materno;
    this.persona.telefono = this.form.value.telefono;
    this.persona.sexo = this.form.value.sexo;
    // this.persona.direccion = `${this.form.value.direccion.calle} ${this.form.value.direccion.numero_interior} ${this.form.value.direccion.asentamiento} ${this.form.value.direccion.cp} ${this.form.value.direccion.municipio} ${this.form.value.direccion.estado}`;
    this.persona.direccion = this.form.value.direccion;
    this.persona.capturista = this.form.value.capturista;
    this.persona.seccion = this.form.value.seccion;
    this.persona.fecha_registro = this.form.value.fecha_registro;
  }

  alert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Persona guardada',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
