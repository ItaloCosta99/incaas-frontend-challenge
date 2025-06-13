import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { PartesService } from '../../core/services/partes.service';
import { ParteInteressada } from '../../core/models/parte.model';
import { ParteFormComponent } from './parte-form/parte-form.component';
import { DocumentPipe } from '../../core/pipes/document.pipe';

@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrls: ['./partes.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    ToastModule,
    ConfirmDialogModule,
    ParteFormComponent,
    DocumentPipe,
  ],
  providers: [MessageService, ConfirmationService],
})
export class PartesComponent {
  displayModal = false;
  selectedParte: ParteInteressada | null = null;

  constructor(
    public partesService: PartesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  showModal(parte?: ParteInteressada): void {
    this.selectedParte = parte || null;
    this.displayModal = true;
  }

  onSave(parte: ParteInteressada): void {
    if (parte.id) {
      this.partesService.updateParte(parte);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Parte atualizada!',
      });
    } else {
      this.partesService.addParte(parte);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Parte cadastrada!',
      });
    }
  }

  onDelete(id: string): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover esta parte?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.partesService.deleteParte(id);
        this.messageService.add({
          severity: 'info',
          summary: 'Removido',
          detail: 'Parte removida.',
        });
      },
    });
  }
}
