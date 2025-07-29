import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientId } from './patient-id';

describe('PatientId', () => {
  let component: PatientId;
  let fixture: ComponentFixture<PatientId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
