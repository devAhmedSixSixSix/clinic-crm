import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomTitleAndDescription } from '../../components/custom-title-and-description/custom-title-and-description';
import { CustomInput } from '../../components/custom-input/custom-input';
import { FormBTN } from '../../components/form-btn/form-btn';
import { sendPasswordResetEmail, Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CustomTitleAndDescription,
    CustomInput,
    FormBTN,
    CommonModule,
  ],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
  fb = inject(FormBuilder);
  auth = inject(Auth);
  router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async handleReset() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    const { email } = this.form.value;

    try {
      await sendPasswordResetEmail(this.auth, email!);
      await Swal.fire({
        icon: 'success',
        title: 'Email Sent!',
        text: 'Password reset instructions have been sent to your email.',
        confirmButtonText: 'OK',
      });
      this.router.navigate(['/']);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send Email',
        text: error.message || 'Something went wrong. Please try again.',
      });
    }
  }
}
