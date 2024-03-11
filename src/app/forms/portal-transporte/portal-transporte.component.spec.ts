import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalTransporteComponent } from './portal-transporte.component';

describe('PortalTransporteComponent', () => {
  let component: PortalTransporteComponent;
  let fixture: ComponentFixture<PortalTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalTransporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
