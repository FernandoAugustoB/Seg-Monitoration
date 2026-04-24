import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountCameras } from './count-cameras';

describe('CountCameras', () => {
  let component: CountCameras;
  let fixture: ComponentFixture<CountCameras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountCameras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountCameras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
