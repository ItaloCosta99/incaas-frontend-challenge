import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteFormComponent } from './parte-form.component';

describe('ParteFormComponent', () => {
  let component: ParteFormComponent;
  let fixture: ComponentFixture<ParteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
