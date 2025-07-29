import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBTN } from './form-btn';

describe('FormBTN', () => {
  let component: FormBTN;
  let fixture: ComponentFixture<FormBTN>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBTN]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBTN);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
