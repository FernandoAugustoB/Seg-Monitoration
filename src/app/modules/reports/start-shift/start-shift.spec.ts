import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartShift } from './start-shift';

describe('StartShift', () => {
  let component: StartShift;
  let fixture: ComponentFixture<StartShift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartShift]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartShift);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
