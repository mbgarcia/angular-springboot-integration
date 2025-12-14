import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BenefitCrudComponent } from './benefit-crud/benefit-crud.component';
import { BenefitsListComponent } from './benefits-list/benefits-list.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'benefit-crud', component: BenefitCrudComponent},
    {path: 'benefits', component: BenefitsListComponent},
];
