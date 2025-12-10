import { Injectable } from '@angular/core';
import { BenefitAccount } from '../interfaces/benefit-account';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  constructor() { }

  url = environment.backendUrl;

  async getAllBenefits(): Promise<BenefitAccount[]> {
    console.log('url', this.url);

    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  createBenefit(nome: string, descricao: string, valor: string, ativo: boolean) {
    console.log('name, description, value, active');
  }
}
