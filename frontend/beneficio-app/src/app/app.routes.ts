import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BenefitComponent } from './benefit/benefit.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'benefits', component: BenefitComponent, title: 'Benefits Page'}
];
