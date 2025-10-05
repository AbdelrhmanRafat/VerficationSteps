import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupStateService } from '../signup-state.service';

interface Theme {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-theme-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './theme-selection.html'
})
export class ThemeSelectionComponent {
  private state = inject(SignupStateService);
  themeForm: FormGroup;

  themes: Theme[] = [
    { name: 'Modern Shop', icon: '🛍️' },
    { name: 'Elegant', icon: '✨' },
    { name: 'Minimal', icon: '🎯' },
    { name: 'Colorful', icon: '🌈' },
    { name: 'Professional', icon: '💼' },
    { name: 'Creative', icon: '🎨' }
  ];

  constructor(private fb: FormBuilder) {
    this.themeForm = this.fb.group({
      theme: ['Modern Shop', Validators.required]
    });
  }

  selectTheme(themeName: string) {
    this.themeForm.patchValue({ theme: themeName });
  }

  onSubmit() {
    if (this.themeForm.valid) {
      this.state.updateFormData(this.themeForm.value);
      this.state.nextStep();
    }
  }

  goBack() {
    this.state.previousStep();
  }
}
