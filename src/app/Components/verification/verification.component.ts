import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupStateService } from '../signup-state.service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verification.html'
})
export class VerificationComponent {
  private state = inject(SignupStateService);
  verificationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.verificationForm = this.fb.group({
      otp: this.fb.array(Array(6).fill('').map(() => this.fb.control('', [Validators.required, Validators.pattern('^[0-9]$')]))),
    });
  }

  get otpControls() {
    return (this.verificationForm.get('otp') as FormArray).controls;
  }

  onKeyUp(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      const otpValue = this.verificationForm.value.otp.join('');
      this.state.updateFormData({ otp: otpValue });
      this.state.nextStep();
    }
  }

  goBack() {
    this.state.previousStep();
  }
}
