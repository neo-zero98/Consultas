import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPersonaComponent } from './captura-persona.component';

describe('CapturaPersonaComponent', () => {
  let component: CapturaPersonaComponent;
  let fixture: ComponentFixture<CapturaPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
