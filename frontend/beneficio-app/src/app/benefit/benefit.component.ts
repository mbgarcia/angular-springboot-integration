import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { BenefitService } from '../services/benefit.service';

@Component({
  selector: 'app-benefit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './benefit.component.html',
  styleUrl: './benefit.component.css'
})
export class BenefitComponent {
  benefitService: BenefitService = inject(BenefitService);

  benefitForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    balance: new FormControl(''),
    active: new FormControl(false)
  });

  submitBenefit() {
    this.benefitService.createBenefit(
      this.benefitForm.value.name ?? '',
      this.benefitForm.value.description ?? '',
      this.benefitForm.value.balance ?? '0.00',
      this.benefitForm.value.active || false,
    );
  }

  onSubmit() {
    console.log(this.benefitForm.value);
  }
}
