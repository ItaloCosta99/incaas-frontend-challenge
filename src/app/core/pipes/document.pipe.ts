import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'document',
  standalone: true,
})
export class DocumentPipe implements PipeTransform {
  transform(value: string | undefined, type: 'CPF' | 'CNPJ' = 'CPF'): string {
    if (!value) return '';

    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length === 11) {
      // CPF Format: 000.000.000-00
      return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cleanValue.length === 14) {
      // CNPJ Format: 00.000.000/0000-00
      return cleanValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    }

    return value;
  }
}
