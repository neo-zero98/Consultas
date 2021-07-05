import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloGraficoComponent } from './modelo-grafico.component';

describe('ModeloGraficoComponent', () => {
  let component: ModeloGraficoComponent;
  let fixture: ComponentFixture<ModeloGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeloGraficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
