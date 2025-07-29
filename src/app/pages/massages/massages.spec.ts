import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Massages } from './massages';

describe('Massages', () => {
  let component: Massages;
  let fixture: ComponentFixture<Massages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Massages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Massages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
