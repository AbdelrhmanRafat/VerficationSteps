import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupStateService {
  // Signal to hold the current step, starts at 1
  currentStep = signal<number>(1);

  // Signal to hold all the form data
  formData = signal<any>({});

  // Method to advance to the next step
  nextStep() {
    this.currentStep.update(step => step + 1);
  }

  // Method to go back to the previous step
  previousStep() {
    this.currentStep.update(step => (step > 1 ? step - 1 : 1));
  }

  // Method to jump to a specific step
  goToStep(step: number) {
    // Add logic here to prevent jumping to uncompleted steps if needed
    this.currentStep.set(step);
  }

  // Method to update the form data
  updateFormData(data: any) {
    this.formData.update(currentData => ({ ...currentData, ...data }));
  }
}