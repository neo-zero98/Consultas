import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonaDTO } from 'src/app/models/personaDTO.model';
import { Seccion } from 'src/app/models/seccion.model';
import { ApiService } from 'src/app/services/api.service';
import { ExcelService } from 'src/app/services/excel.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-modelo-grafico',
  templateUrl: './modelo-grafico.component.html',
  styleUrls: ['./modelo-grafico.component.css']
})
export class ModeloGraficoComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Hombres', 'Mujeres'];
  public pieChartData: number[] = [0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,100,0,0.3)', 'rgba(255,0,0,0.3)'],
    },
  ];

  @Input() secciones:Seccion[];
  lstPersonas:any[];
  personasDTO:PersonaDTO[];
  cantidadHombres:number;
  cantidadMujeres:number;
  form = this.fb.group({
    tipo: ['seccion',Validators.required],
    fechaInicio: [null,false],
    fechaFinal: [null,false],
    localidad: [''],
    seccion: []
  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private excelService:ExcelService
  ) {
    this.lstPersonas = [];
    this.personasDTO = [];
  }

  ngOnInit(): void {
  }

  vaciarFormBuilder(){
    this.form.reset();
    this.form.get('tipo').setValue('seccion');
  }

  enviarFormulario(){
    if(this.form.valid === false){
      console.log("formulario no valido");
      return;
    }
    if(this.form.value.tipo === 'seccion'){
      this.getPersonsByDateAndSeccion();
    }
    if(this.form.value.tipo === 'todo'){
      this.getAllPersonas();
    }
    this.vaciarFormBuilder();
    this.invalidadFecha();
    console.log("validado");
  }

  getPersonsByDateAndSeccion(){
    if(this.form.value.fechaFinal === null || this.form.value.fechaFinal === ''){
      this.form.get('fechaFinal').setValue(this.form.value.fechaInicio);
    }
    this.apiService.getPersonsByDateAndSeccion({
      seccion: this.form.value.seccion,
      fechaInicio: this.form.value.fechaInicio,
      fechaFinal: this.form.value.fechaFinal
    }).subscribe( res => {
      this.lstPersonas = res;
      this.formatPersonas();
      this.setPersonasDTO();
      this.setManAndWoman();
      this.setGraficas();
    })
  }

  getAllPersonas(){
    this.apiService.getPersonas().subscribe( res => {
      this.lstPersonas = res;
      this.setPersonasDTO();
      this.setManAndWoman();
      this.setGraficas();
    })
  }

  invalidadFecha(event?){
    console.log("entro invalidadFecha");

    if(event){
      if(event.target.value === 'todo'){
        this.form.get('fechaInicio').disable();
        this.form.get('fechaFinal').disable();
      }else{
        this.form.get('fechaInicio').enable();
        this.form.get('fechaFinal').enable();
      }
    }else{
      this.form.get('fechaInicio').enable();
      this.form.get('fechaFinal').enable();
    }
  }

  descargarEcxel(){
    this.excelService.exportAsExcelFile(this.personasDTO, 'myExcelFile');
    this.lstPersonas = [];
    this.personasDTO = [];
  }

  formatPersonas(){
    let lstPersonas = new Array();
    if(this.lstPersonas.length > 0){
      this.lstPersonas.forEach(fecha => {
        fecha.forEach(element => {
          lstPersonas.push(element);
        });
      });
    }
    this.lstPersonas = lstPersonas;
  }

  setPersonasDTO(){
    this.personasDTO = [];
    this.lstPersonas.forEach( item => {
      const personaDTO = new PersonaDTO();
      personaDTO.Nombre = item.apellido_paterno +' '+ item.apellido_materno +' ' + item.nombres;
      personaDTO.Sexo = item.sexo;
      personaDTO.Direccion = item.direccion;
      personaDTO.Celular = item.telefono;
      personaDTO.Seccion = item.seccion;
      personaDTO.Fecha = item.fecha_registro;
      this.personasDTO.push(personaDTO);
    });
  }

  //chartjs events
   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  setGraficas(){
    this.pieChartData[0] = this.cantidadHombres;
    this.pieChartData[1] = this.cantidadMujeres;
  }

  setManAndWoman(){
    let cantH = 0;
    let cantM = 0;
    this.lstPersonas.forEach( (item, index) => {
      if(item.sexo === 'Hombre'){
        cantH = cantH + 1;
      }else{
        cantM = cantM + 1;
      }
    });
    this.cantidadHombres = cantH;
    this.cantidadMujeres = cantM;
  }

}
