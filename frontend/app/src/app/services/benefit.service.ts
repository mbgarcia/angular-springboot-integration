import { Injectable, signal } from '@angular/core';
import { BenefitAccount } from '../models/benefit-account';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TransferOperation } from '../models/transfer-operation';

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
    return this.http.post<BenefitAccount>(`${this.url}/`, benefit);
  }

  updateBenefit(id: Number, updatedBenefit: BenefitAccount) {
    return this.http.put<BenefitAccount>(`${this.url}/${id}`, updatedBenefit);
  }

  deleteBenefit(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getBenefitById(id: number) {
    return this.http.get<BenefitAccount>(`${this.url}/${id}`);
  }

  transferBetweenAccounts(transfer: TransferOperation) {
    return this.http.post<void>(`${this.url}/transfer/`, transfer);
  }
}
