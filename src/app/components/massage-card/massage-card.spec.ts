import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageCard } from './massage-card';

describe('MassageCard', () => {
  let component: MassageCard;
  let fixture: ComponentFixture<MassageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassageCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassageCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
