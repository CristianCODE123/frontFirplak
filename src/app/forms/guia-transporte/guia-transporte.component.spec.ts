import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaTransporteComponent } from './guia-transporte.component';

describe('GuiaTransporteComponent', () => {
  let component: GuiaTransporteComponent;
  let fixture: ComponentFixture<GuiaTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaTransporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuiaTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
