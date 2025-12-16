import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { BenefitService } from '../services/benefit.service';
import { environment } from '../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-benefit',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  templateUrl: './benefit.component.html',
  styleUrl: './benefit.component.css'
})
export class BenefitComponent {
  benefitService: BenefitService = inject(BenefitService);

  benefitForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl(''),
    valor: new FormControl(''),
    ativo: new FormControl(false)
  });

  url = environment.backendUrl;

  async submitBenefit() {
    this.benefitService.createBenefit(
      this.benefitForm.value.nome ?? '',
      this.benefitForm.value.descricao ?? '',
      this.benefitForm.value.valor ?? '0.00',
      this.benefitForm.value.ativo || false,
    );
  }

  onSubmit() {
    console.log(this.benefitForm.value);
  }
}
