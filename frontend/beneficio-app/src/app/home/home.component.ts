import { Component, inject, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BenefitAccount } from '../interfaces/benefit-account';
import { BenefitService } from '../services/benefit.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    MatSlideToggleModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'valor', 'ativo'];

  benefitService: BenefitService = inject(BenefitService);

  dataSource = new MatTableDataSource<BenefitAccount>();

  constructor() {
    this.benefitService.getAllBenefits().then((benefits) => {
      this.dataSource.data = benefits;
    });
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
