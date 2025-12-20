import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BenefitAccount } from '../models/benefit-account';
import { MatSelectModule } from '@angular/material/select';
import { TransferOperation } from '../models/transfer-operation';
import { BenefitService } from '../services/benefit.service';
import { NotificationService } from '../services/notification.service';


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
  private benefitService = inject(BenefitService);
  private notificationService = inject(NotificationService);
  accounts = signal<BenefitAccount[]>([]);

  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  transferForm = new FormGroup({
    fromId: new FormControl<number>(0, {validators: Validators.required, nonNullable: true}),
    toId: new FormControl<number>(0, {validators: Validators.required, nonNullable: true}),
    valor: new FormControl(0, {validators: [Validators.required, Validators.min(0.01)], nonNullable: true}),
  });


  constructor() {
    this.benefitService.loadBenefits().subscribe({
      next: (e) => {
        this.accounts.set(e);
      }
    });
  }
  
  submitTransfer() {
    if (this.transferForm.invalid) {
      this.notificationService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const payload: TransferOperation = {...this.transferForm.getRawValue() };

    this.benefitService.transferBetweenAccounts(payload).subscribe({
      next: () => {
        this.notificationService.showMessage('Transferência realizada com sucesso!');

        this.router.navigate(['/dashboard']);
      }
    });
  }
}
