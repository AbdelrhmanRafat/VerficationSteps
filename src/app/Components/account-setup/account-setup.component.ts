import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupStateService } from '../signup-state.service';

// Custom validator to check if passwords match
export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value !== confirmPassword.value ? { passwordsMismatch: true } : null;
}

@Component({
  selector: 'app-account-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-setup.html'
})
export class AccountSetupComponent {
  private state = inject(SignupStateService);
  accountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const { confirmPassword, ...formData } = this.accountForm.value;
      this.state.updateFormData(formData);
      this.state.nextStep();
    }
  }

  goBack() {
    this.state.previousStep();
  }
}
