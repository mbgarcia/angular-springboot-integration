import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BenefitAccount } from '../models/benefit-account';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { BenefitService } from '../services/benefit.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule,
    CommonModule, 
    MatPaginatorModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSortModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private benefitService = inject(BenefitService);
  private router = inject(Router);
  private benefits = signal<BenefitAccount[]>([]);
  private notificationService = inject(NotificationService);

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'valor', 'ativo', 'actions'];

  dataSource = new MatTableDataSource<BenefitAccount>([]);

  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) {
    const benefits = this.benefitService.loadBenefits().subscribe({
      next: (e) => {
        this.benefits.set(e);
      }
    });

    effect(() => {
      this.dataSource.data = this.benefits();
      this.totalItems = this.benefits().length;
    });
  }

  onPageChange(event: any) {
    this.dataSource.paginator = this.paginator;
    this.pageSize = event.pageSize;
  }

  openDeleteDialog(item: any): void {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = '550px';
    config.height = '280px';
    config.data = { nome: item.nome };

    const dialogRef = this.dialog.open(DeleteDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.benefitService.deleteBenefit(item.id).subscribe({
          next: () => {
            this.notificationService.showMessage('Conta inativada com sucesso!');
            item.ativo = false;
          }
        });
      }
    });  
  }
}
