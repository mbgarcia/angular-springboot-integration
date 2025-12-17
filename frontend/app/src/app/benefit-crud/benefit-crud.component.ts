import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup,  ReactiveFormsModule, Validators} from '@angular/forms';
import { BenefitService } from '../services/benefit.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BenefitAccount } from '../models/benefit-account';

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
  benefitService: BenefitService = inject(BenefitService);
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
          this.benefitService.getBenefitById(this.benefitId).subscribe(benefit => {
            this.benefitForm.setValue({
              nome: benefit.nome,
              descricao: benefit.descricao,
              valor: benefit.valor,
              ativo: benefit.ativo
            });
            this.benefitId = benefit.id;
            this.submitAction.set('Atualizar Conta');
          });
        });
      }
    });
  }

  async submitBenefit() {
    if (this.benefitForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios corretamente.', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    const payload: BenefitAccount = {...this.benefitForm.getRawValue(), id: this.benefitId };

    if (this.isEditMode && this.benefitId) {
      this.benefitService.updateBenefit(this.benefitId, payload).subscribe({
        next: () => {
          this.snackBar.open('Conta atualizada com sucesso!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error updating benefit:', error);
          this.snackBar.open('Erro ao atualizar conta de benefício.', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      });
    } else {
      this.benefitService.addBenefit(payload).subscribe({
        next: () => {
          this.snackBar.open('Nova conta criada com sucesso!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error creating benefit:', error);
          this.snackBar.open('Erro ao criar conta.', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      });
    }    
  }
}