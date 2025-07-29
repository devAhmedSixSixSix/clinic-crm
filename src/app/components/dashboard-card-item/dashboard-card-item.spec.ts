import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardItem } from './dashboard-card-item';

describe('DashboardCardItem', () => {
  let component: DashboardCardItem;
  let fixture: ComponentFixture<DashboardCardItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCardItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCardItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
