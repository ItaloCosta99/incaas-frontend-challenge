// src/app/core/services/cnj.service.ts
import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CNJProcesso {
  numeroProcesso: string;
  codigoUnidade: string;
  assuntosPrincipais: string[];
  classeJudicial: string;
  grau: string;
  justica: string;
}

interface CNJResponseSource {
  numeroProcesso: string;
  classe: {
    codigo: number;
    nome: string;
  };
  grau: string;
  tribunal: string;
  orgaoJulgador: {
    codigo: number;
    nome: string;
  };
  assuntos: Array<{
    codigo: number;
    nome: string;
  }>;
}

export interface CNJSearchResponse {
  took: number;
  timed_out: boolean;
  hits: {
    total: {
      value: number;
      relation: string;
    };
    hits: Array<{
      _source: CNJResponseSource;
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
        match?: Record<string, string>;
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

@Injectable({ providedIn: 'root' })
export class CnjService {
  private http = inject(HttpClient);
  private apiUrl = '/api/_search';
  // API key is now handled by the proxy configuration
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  consultarProcesso(
    numeroProcesso?: string,
    grau?: string,
    justica?: string,
    ordenarPorNumero: boolean = false,
    size: number = 100
  ): Observable<CNJProcesso[]> {
    if (!numeroProcesso && !grau && !justica) {
      return EMPTY;
    }

    let searchRequest: CNJSearchRequest;

    // Se tiver número do processo, usa match simples
    if (numeroProcesso) {
      searchRequest = {
        query: {
          match: {
            numeroProcesso: numeroProcesso.replace(/[^0-9]/g, ''), // Remove caracteres não numéricos
          },
        },
        size,
      };
    }
    // Se não tiver número do processo mas tiver outros filtros
    else {
      const must: Array<{ match: Record<string, string> }> = [];

      if (grau) {
        must.push({
          match: { grau },
        });
      }

      if (justica) {
        must.push({
          match: { tribunal: justica },
        });
      }

      searchRequest = {
        query: {
          bool: { must },
        },
        size,
      };
    }

    // Se precisar ordenar
    if (ordenarPorNumero) {
      searchRequest.sort = [
        {
          numeroProcesso: {
            order: 'desc',
          },
        },
      ];
    }

    console.log('Request URL:', this.apiUrl);
    console.log('Request Headers:', this.getHeaders());
    console.log('Request Payload:', JSON.stringify(searchRequest, null, 2));

    return this.http
      .post<CNJSearchResponse>(this.apiUrl, searchRequest, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {
          console.log('Response:', response);
          return this.transformResponse(response);
        }),
        catchError((error) => {
          console.error('Error details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.message,
            error: error.error,
          });
          return this.handleError(error);
        })
      );
  }

  private transformResponse(response: CNJSearchResponse): CNJProcesso[] {
    if (!response?.hits?.hits?.length) {
      console.log('No results found');
      return [];
    }

    return response.hits.hits.map((hit) => ({
      numeroProcesso: hit._source.numeroProcesso,
      codigoUnidade: hit._source.orgaoJulgador.codigo.toString(),
      assuntosPrincipais: hit._source.assuntos.map((assunto) => assunto.nome),
      classeJudicial: hit._source.classe.nome,
      grau: hit._source.grau,
      justica: hit._source.tribunal,
    }));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';

    if (error.status === 0) {
      errorMessage =
        'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
    } else if (error.status === 401) {
      errorMessage = 'Acesso não autorizado. Verifique suas credenciais.';
    } else if (error.status === 404) {
      console.log('404 error - returning empty array');
      return [];
    } else if (error.status >= 500) {
      errorMessage = 'Erro no servidor do CNJ. Tente novamente mais tarde.';
    }

    return throwError(() => new Error(errorMessage));
  }

  getGrausJustica(): { graus: string[]; justicas: string[] } {
    return {
      graus: ['G1', 'JE', 'G2', 'TR', 'TRU', 'TNU', 'SU'],
      justicas: [
        'TST',
        'TSE',
        'STJ',
        'STM',
        'TRF1',
        'TRF2',
        'TRF3',
        'TRF4',
        'TRF5',
        'TRF6',
        'TJAC',
        'TJAL',
        'TJAP',
        'TJCE',
        'TJES',
        'TJMA',
        'TJMS',
        'TJMT',
        'TJPA',
        'TJPB',
        'TJPI',
        'TJRN',
        'TJSP',
        'TJRJ',
        'TJMG',
        'TJRS',
        'TJBA',
        'TJPR',
        'TJSC',
        'TJPE',
        'TJGO',
        'TJDFT',
        'TJAM',
        'TJRR',
        'TJTO',
        'TJPI',
        'TRT1',
        'TRT2',
        'TRT3',
        'TRT4',
        'TRT5',
        'TRT6',
        'TRT7',
        'TRT8',
        'TRT9',
        'TRT10',
        'TRT11',
        'TRT12',
        'TRT13',
        'TRT14',
        'TRT15',
        'TRT16',
        'TRT17',
        'TRT18',
        'TRT19',
        'TRT20',
        'TRT21',
        'TRT22',
        'TRT23',
        'TRT24',
        'TRE-AC',
        'TRE-AL',
        'TRE-AP',
        'TRE-CE',
        'TRE-ES',
        'TRE-MA',
        'TRE-MS',
        'TRE-MT',
        'TRE-PA',
        'TRE-PB',
        'TRE-PI',
        'TRE-RN',
        'TRE-SP',
        'TRE-RJ',
        'TRE-MG',
        'TRE-RS',
        'TRE-BA',
        'TRE-PR',
        'TRE-SC',
        'TRE-PE',
        'TRE-GO',
        'TRE-DFT',
        'TRE-AM',
        'TRE-RR',
        'TRE-TO',
        'TRE-PI',
        'TJMMG',
        'TJMSP',
        'TJMRS',
      ],
    };
  }
}
