import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupStateService } from '../signup-state.service';

@Component({
  selector: 'app-phone-number',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './phone-number.html'
})
export class PhoneNumberComponent {
  private state = inject(SignupStateService);
  phoneForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      country: ['+20', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit() {
    if (this.phoneForm.valid) {
      this.state.updateFormData(this.phoneForm.value);
      this.state.nextStep();
    }
  }
}
