import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCameras } from './verification-cameras';

describe('VerificationCameras', () => {
  let component: VerificationCameras;
  let fixture: ComponentFixture<VerificationCameras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationCameras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationCameras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
