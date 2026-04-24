import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndShift } from './end-shift';

describe('EndShift', () => {
  let component: EndShift;
  let fixture: ComponentFixture<EndShift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndShift]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndShift);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
