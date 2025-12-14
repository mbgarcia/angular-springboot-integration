import { Injectable, signal } from '@angular/core';
import { BenefitAccount } from '../models/benefit-account';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  private benefitsSignal = signal<BenefitAccount[]>([]);

  url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  loadBenefits() {
    this.http.get<BenefitAccount[]>(`${this.url}/`)
      .subscribe(benefits => {
        this.benefitsSignal.set(benefits);
      });
  }

  get benefits() {
    return this.benefitsSignal;
  }

  addBenefit(benefit: BenefitAccount) {
    return this.http.post<BenefitAccount>(`${this.url}/`, benefit)
      .subscribe(newBenefit => {
        this.benefitsSignal.update(benefits => [...benefits, newBenefit]);
      });
  }

  updateBenefit(updatedBenefit: BenefitAccount) {
    return this.http.put<BenefitAccount>(`${this.url}/${updatedBenefit.id}`, updatedBenefit)
      .subscribe(updatedBenefit => {
        this.benefitsSignal.update(benefits => 
          benefits.map(b => b.id === updatedBenefit.id ? updatedBenefit : b)
        );
      });
  }

  deleteBenefit(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`)
      .subscribe(() => this.loadBenefits());
  }

  getBenefitById(id: number) {
    return this.http.get<BenefitAccount>(`${this.url}/${id}`);
  }
}
