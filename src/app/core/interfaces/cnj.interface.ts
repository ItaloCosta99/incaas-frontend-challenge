export interface CNJProcesso {
  numeroProcesso: string;
  codigoUnidade: string;
  assuntosPrincipais: string[];
  classeJudicial: string;
  grau: string;
  justica: string;
  numeroProcessos?: number;
}

export interface CNJSearchResponse {
  hits: {
    total: {
      value: number;
      relation: string;
    };
    hits: Array<{
      _source: {
        numeroProcesso: string;
        codigoUnidade: string;
        assuntosCnj: Array<{
          codigoNacional: string;
          nome: string;
        }>;
        classeProcessual: {
          nome: string;
        };
        grau: string;
        ramo: string;
      };
    }>;
  };
}

export interface CNJSearchRequest {
  query: {
    match?: {
      numeroProcesso?: string;
    };
    bool?: {
      must?: Array<{
        match?: {
          grau?: string;
          ramo?: string;
        };
      }>;
    };
  };
  sort?: Array<{
    [key: string]: {
      order: 'asc' | 'desc';
    };
  }>;
  size?: number;
}
