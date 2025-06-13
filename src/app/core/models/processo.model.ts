export interface ProcessoResponse {
  data: Processo[];
}

export interface Processo {
  codigo_unidade: string;
  assuntos_principais: string[];
  classe_judicial: string;
  grau: string;
  justica: string;
  numero_processos: number;
}
