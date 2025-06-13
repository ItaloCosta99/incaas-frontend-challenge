import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { ParteInteressada } from '../../../core/models/parte.model';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'app-parte-form',
  templateUrl: './parte-form.component.html',
  styleUrl: './parte-form.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    MessageModule,
    FluidModule,
  ],
})
export class ParteFormComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() parteToEdit: ParteInteressada | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  partesForm: FormGroup;
  tiposPessoa = [
    { label: 'Pessoa Física', value: 'Fisica' },
    { label: 'Pessoa Jurídica', value: 'Juridica' },
  ];
  cpfCnpjMask = '999.999.999-99';

  constructor(private fb: FormBuilder) {
    this.partesForm = this.fb.group({
      nome: ['', Validators.required],
      tipoPessoa: ['Fisica', Validators.required],
      cpfCnpj: [
        '',
        [Validators.required, Validators.pattern(/^\d{11}$|^\d{14}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parteToEdit'] && !changes['parteToEdit'].firstChange) {
      if (this.parteToEdit) {
        this.partesForm.patchValue(this.parteToEdit);
        // Update mask based on tipo pessoa
        this.cpfCnpjMask =
          this.parteToEdit.tipoPessoa === 'Fisica'
            ? '999.999.999-99'
            : '99.999.999/9999-99';
      } else {
        this.partesForm.reset({ tipoPessoa: 'Fisica' });
        this.cpfCnpjMask = '999.999.999-99';
      }
    }
  }

  ngOnInit(): void {
    this.setupFormSubscriptions();
    if (this.parteToEdit) {
      this.partesForm.patchValue(this.parteToEdit);
      this.cpfCnpjMask =
        this.parteToEdit.tipoPessoa === 'Fisica'
          ? '999.999.999-99'
          : '99.999.999/9999-99';
    }
  }

  private setupFormSubscriptions(): void {
    this.partesForm.get('tipoPessoa')?.valueChanges.subscribe((value) => {
      if (value === 'Fisica') {
        this.cpfCnpjMask = '999.999.999-99';
        this.partesForm
          .get('cpfCnpj')
          ?.setValidators([
            Validators.required,
            Validators.pattern(/^\d{11}$/),
          ]);
      } else {
        this.cpfCnpjMask = '99.999.999/9999-99';
        this.partesForm
          .get('cpfCnpj')
          ?.setValidators([
            Validators.required,
            Validators.pattern(/^\d{14}$/),
          ]);
      }
      this.partesForm.get('cpfCnpj')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.partesForm.invalid) {
      this.partesForm.markAllAsTouched();
      return;
    }

    this.save.emit({
      ...(this.parteToEdit?.id ? { id: this.parteToEdit.id } : {}),
      ...this.partesForm.value,
    });
    this.hideDialog();
  }

  hideDialog(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.partesForm.reset({ tipoPessoa: 'Fisica' });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.partesForm.get(fieldName);
    return !!field && field.invalid && field.touched;
  }
}
