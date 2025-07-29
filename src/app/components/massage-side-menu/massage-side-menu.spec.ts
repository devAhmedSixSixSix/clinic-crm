import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageSideMenu } from './massage-side-menu';

describe('MassageSideMenu', () => {
  let component: MassageSideMenu;
  let fixture: ComponentFixture<MassageSideMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassageSideMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassageSideMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
