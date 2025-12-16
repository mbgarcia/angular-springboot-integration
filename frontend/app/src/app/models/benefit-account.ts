export interface BenefitAccount {
    id: number;
    nome: string;
    descricao: string | null;
    valor: number;
    ativo: boolean;
}
