import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassagesId } from './massages-id';

describe('MassagesId', () => {
  let component: MassagesId;
  let fixture: ComponentFixture<MassagesId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassagesId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassagesId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
