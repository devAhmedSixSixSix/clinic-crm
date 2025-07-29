import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageText } from './massage-text';

describe('MassageText', () => {
  let component: MassageText;
  let fixture: ComponentFixture<MassageText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassageText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassageText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
