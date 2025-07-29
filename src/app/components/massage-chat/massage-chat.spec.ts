import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageChat } from './massage-chat';

describe('MassageChat', () => {
  let component: MassageChat;
  let fixture: ComponentFixture<MassageChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassageChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassageChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
