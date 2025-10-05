import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupStateService } from '../signup-state.service';

@Component({
  selector: 'app-store-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './store-details.html'
})
export class StoreDetailsComponent {
  private state = inject(SignupStateService);
  storeForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.storeForm = this.fb.group({
      storeNameAr: ['', Validators.required],
      storeNameEn: ['', Validators.required],
      businessSector: ['', Validators.required],
      storeLogo: [null, Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.storeForm.patchValue({ storeLogo: file });
    }
  }

  onSubmit() {
    if (this.storeForm.valid) {
      this.state.updateFormData(this.storeForm.value);
      this.state.nextStep();
    }
  }

  goBack() {
    this.state.previousStep();
  }
}
