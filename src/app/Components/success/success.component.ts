import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupStateService } from '../signup-state.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.html'
})
export class SuccessComponent {
  private state = inject(SignupStateService);
  formData = this.state.formData;

  // Example of how to construct the store URL from form data
  get storeUrl() {
    const storeNameEn = this.formData().storeNameEn?.toLowerCase().replace(/\s+/g, '-');
    return `${storeNameEn || 'yourstore'}.baseet.store`;
  }

  goToDashboard() {
    // Logic to navigate to the dashboard
    console.log('Navigating to dashboard...');
  }
}
