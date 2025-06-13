import { Injectable, signal } from '@angular/core';
import { ParteInteressada } from '../models/parte.model';

@Injectable({ providedIn: 'root' })
export class PartesService {
  private readonly localStorageKey = 'partesInteressadas';
  public partes = signal<ParteInteressada[]>([]);

  constructor() {
    this.loadPartes();
  }

  private loadPartes(): void {
    const data = localStorage.getItem(this.localStorageKey);
    this.partes.set(data ? JSON.parse(data) : []);
  }

  private savePartes(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.partes()));
  }

  addParte(parte: Omit<ParteInteressada, 'id'>): void {
    const novaParte = { ...parte, id: Date.now().toString() };
    this.partes.update((partes) => [...partes, novaParte]);
    this.savePartes();
  }

  updateParte(parteAtualizada: ParteInteressada): void {
    this.partes.update((partes) =>
      partes.map((p) => (p.id === parteAtualizada.id ? parteAtualizada : p))
    );
    this.savePartes();
  }

  deleteParte(id: string): void {
    this.partes.update((partes) => partes.filter((p) => p.id !== id));
    this.savePartes();
  }
}
