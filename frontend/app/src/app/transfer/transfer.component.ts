import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup,  ReactiveFormsModule, Validators} from '@angular/forms';
import { BenefitService } from '../services/benefit.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BenefitAccount } from '../models/benefit-account';
import { MatSelectModule } from '@angular/material/select';
import { TransferOperation } from '../models/transfer-operation';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transfer',
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatInputModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {
  benefitService: BenefitService = inject(BenefitService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  transferForm = new FormGroup({
    fromId: new FormControl<number>(0, {validators: Validators.required, nonNullable: true}),
    toId: new FormControl<number>(0, {validators: Validators.required, nonNullable: true}),
    valor: new FormControl(0, {validators: [Validators.required, Validators.min(0.01)], nonNullable: true}),
  });

  accounts : BenefitAccount[] = [];

  constructor() {
    this.benefitService.loadBenefits();
    effect(() => {
      this.accounts = this.benefitService.benefits();
    });
  }
  
  submitTransfer() {
    if (this.transferForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios corretamente.', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    const payload: TransferOperation = {...this.transferForm.getRawValue() };

    this.benefitService.transferBetweenAccounts(payload).subscribe({
      next: () => {
        this.snackBar.open('Transferência realizada com sucesso!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        let message = "Erro ao transferir valor.";

        if (422 === e.status) {
          message = e.error['message'];
        }

        this.snackBar.open(message, 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    });

  }
}
