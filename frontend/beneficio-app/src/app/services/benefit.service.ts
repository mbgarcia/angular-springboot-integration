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

    const data = await fetch(`${this.url}/`);
    return await data.json() ?? [];
  }

  async createBenefit(nome: string, descricao: string, valor: string, ativo: boolean) {
    let item = {
      nome: nome,
      descricao: descricao,
      valor: parseFloat(valor),
      ativo: ativo
    };

    console.log(JSON.stringify(item));

    const response = await fetch(`${this.url}/novo/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    alert('Benefício criado com sucesso!');
  }
}
