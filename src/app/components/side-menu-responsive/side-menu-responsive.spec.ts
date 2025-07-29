import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuResponsive } from './side-menu-responsive';

describe('SideMenuResponsive', () => {
  let component: SideMenuResponsive;
  let fixture: ComponentFixture<SideMenuResponsive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuResponsive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuResponsive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
