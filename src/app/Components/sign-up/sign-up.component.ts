import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupStateService } from '../signup-state.service';

// Import all step components
import { PhoneNumberComponent } from '../phone-number/phone-number.component';
import { VerificationComponent } from '../verification/verification.component';
import { AccountSetupComponent } from '../account-setup/account-setup.component';
import { StoreDetailsComponent } from '../store-details/store-details.component';
import { ThemeSelectionComponent } from '../theme-selection/theme-selection.component';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    PhoneNumberComponent,
    VerificationComponent,
    AccountSetupComponent,
    StoreDetailsComponent,
    ThemeSelectionComponent,
    SuccessComponent
  ],
  templateUrl: './sign-up.html'
})
export class SignUpComponent {
  state = inject(SignupStateService);
  currentStep = this.state.currentStep;

  steps = [
    { step: 1, title: 'Phone Number', subtitle: 'Verify your identity' },
    { step: 2, title: 'Verification', subtitle: 'Enter OTP code' },
    { step: 3, title: 'Account Setup', subtitle: 'Email & password' },
    { step: 4, title: 'Store Details', subtitle: 'Name & branding' },
    { step: 5, title: 'Choose Theme', subtitle: 'Select design' }
  ];
}
