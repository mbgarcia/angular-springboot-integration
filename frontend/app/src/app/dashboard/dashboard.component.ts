import { Component, effect, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BenefitService } from '../services/benefit.service';
import { BenefitAccount } from '../models/benefit-account';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule,
    CommonModule, 
    MatPaginatorModule,
    MatSnackBarModule,
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
  benefitService = inject(BenefitService);
  snackBar = inject(MatSnackBar);

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

  benefits = this.benefitService.benefits;

  constructor() {
    this.benefitService.loadBenefits();

    effect(() => {
      const benefits = this.benefits();

      console.log('Benefits updated:', benefits);
      this.dataSource.data = benefits;
      this.totalItems = benefits.length;
    });
  }

  onPageChange(event: any) {
    this.dataSource.paginator = this.paginator;
    this.pageSize = event.pageSize;
  }
}
