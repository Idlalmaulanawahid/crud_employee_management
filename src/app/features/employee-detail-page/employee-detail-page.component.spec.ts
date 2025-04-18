import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailPageComponent } from './employee-detail-page.component';

describe('EmployeeDetailPageComponent', () => {
  let component: EmployeeDetailPageComponent;
  let fixture: ComponentFixture<EmployeeDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
