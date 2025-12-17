import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BenefitCrudComponent } from './benefit-crud/benefit-crud.component';
import { TransferComponent } from './transfer/transfer.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'benefit-crud', component: BenefitCrudComponent},
    {path: 'benefit-crud/:id', component: BenefitCrudComponent},
    {path: 'transfer', component: TransferComponent},
];
