import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-delete-dialog',
  imports: [MatButtonModule],
  template: `
    <h1 mat-dialog-title class="dialog-title">Confirmação para inativar Conta</h1>
    <div mat-dialog-content class="dialog-content">
      <p>Tem certeza que deseja inativar a conta de benefício do cliente "{{data.nome}}"?</p>
    </div>
    <div mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button color="warn" (click)="save()">Confirmar</button>
    </div>
  `,
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(true);
  }  
}
