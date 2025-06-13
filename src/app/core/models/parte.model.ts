export interface ParteInteressada {
  id: string;
  nome: string;
  tipoPessoa: 'Fisica' | 'Juridica';
  cpfCnpj: string;
  email: string;
}
