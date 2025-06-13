import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CnjService, CNJProcesso } from '../../core/services/cnj.service';

@Component({
  selector: 'app-processo-list',
  templateUrl: './processo.component.html',
  styleUrl: './processo.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class ProcessoComponent {
  searchForm: FormGroup;
  processos: CNJProcesso[] = [];
  loading = false;
  grausOptions: { label: string; value: string }[] = [];
  justicasOptions: { label: string; value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private cnjService: CnjService,
    private messageService: MessageService
  ) {
    this.searchForm = this.fb.group({
      numeroProcesso: [''],
      grau: [''],
      justica: [''],
      ordenarPorNumero: [false],
    });

    const { graus, justicas } = this.cnjService.getGrausJustica();
    this.grausOptions = graus.map((grau) => ({ label: grau, value: grau }));
    this.justicasOptions = justicas.map((justica) => ({
      label: justica,
      value: justica,
    }));
  }

  onSubmit(): void {
    if (
      !this.searchForm.value.numeroProcesso &&
      !this.searchForm.value.grau &&
      !this.searchForm.value.justica
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha pelo menos um filtro para realizar a pesquisa.',
      });
      return;
    }

    this.loading = true;
    this.cnjService
      .consultarProcesso(
        this.searchForm.value.numeroProcesso,
        this.searchForm.value.grau,
        this.searchForm.value.justica,
        this.searchForm.value.ordenarPorNumero
      )
      .subscribe({
        next: (data) => {
          this.processos = data;
          if (data.length === 0) {
            this.messageService.add({
              severity: 'info',
              summary: 'Informação',
              detail: 'Nenhum processo encontrado com os filtros informados.',
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  clearFilters(): void {
    this.searchForm.reset();
    this.processos = [];
  }
}
