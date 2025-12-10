import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BenefitComponent } from './benefit/benefit.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Home Page'},
    {path: 'benefits', component: BenefitComponent, title: 'Benefits Page'}
];
