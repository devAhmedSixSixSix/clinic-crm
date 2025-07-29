import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTitleAndDescription } from './custom-title-and-description';

describe('CustomTitleAndDescription', () => {
  let component: CustomTitleAndDescription;
  let fixture: ComponentFixture<CustomTitleAndDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTitleAndDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTitleAndDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
