import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSatusCard } from './table-satus-card';

describe('TableSatusCard', () => {
  let component: TableSatusCard;
  let fixture: ComponentFixture<TableSatusCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSatusCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSatusCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
