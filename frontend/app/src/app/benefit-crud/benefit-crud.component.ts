import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BenefitAccount } from '../models/benefit-account';
import { BenefitService } from '../services/benefit.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-benefit-crud',
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  templateUrl: './benefit-crud.component.html',
  styleUrl: './benefit-crud.component.css'
})
export class BenefitCrudComponent {
  private benefitService: BenefitService = inject(BenefitService);
  private notificationService: NotificationService = inject(NotificationService);

  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  benefitForm = new FormGroup({
    nome: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
    descricao: new FormControl<string>(''),
    valor: new FormControl(0, {validators: [Validators.required, Validators.min(0)], nonNullable: true}),
    ativo: new FormControl(true, {validators: Validators.required, nonNullable: true})
  });

  isEditMode: boolean = false;
  benefitId: number = 0;

  submitAction = signal('Criar Conta');

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.benefitId = +id;

        effect(() => {
          this.benefitService.getBenefitById(this.benefitId).subscribe({
            next: (benefit: BenefitAccount) => {
              this.benefitForm.setValue({
                nome: benefit.nome,
                descricao: benefit.descricao,
                valor: benefit.valor,
                ativo: benefit.ativo
              });

              this.benefitId = benefit.id;
              this.submitAction.set('Atualizar Conta');

              console.log('Fetched benefit by ID:', benefit);
            }
          });
        });
      }
    });
  }

  async submitBenefit() {
    if (this.benefitForm.invalid) {
      this.notificationService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const payload: BenefitAccount = {...this.benefitForm.getRawValue(), id: this.benefitId };

    if (this.isEditMode && this.benefitId) {
      this.benefitService.updateBenefit(this.benefitId, payload).subscribe({
        next: () => {
          this.notificationService.showMessage('Conta atualizada com sucesso!');
        }
      });
    } else {
      this.benefitService.addBenefit(payload)    .subscribe({
        next: () => {
          this.notificationService.showMessage('Nova conta criada com sucesso!');
        }
    });

    }
    
    this.router.navigate(['/dashboard']);
  }
}