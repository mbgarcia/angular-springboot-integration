import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitCrudComponent } from './benefit-crud.component';

describe('BenefitCrudComponent', () => {
  let component: BenefitCrudComponent;
  let fixture: ComponentFixture<BenefitCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
