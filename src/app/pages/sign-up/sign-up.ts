import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormBTN } from '../../components/form-btn/form-btn';
import { CustomInput } from '../../components/custom-input/custom-input';
import { CustomTitleAndDescription } from '../../components/custom-title-and-description/custom-title-and-description';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormBTN,
    CustomInput,
    CustomTitleAndDescription,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    agree: [false, Validators.requiredTrue],
  });

  loading = false;

  async submit() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Form Incomplete',
        text: 'Please complete all fields and agree to the terms.',
      });
      return;
    }

    this.loading = true;
    const { firstName, lastName, email, password } = this.form.value;

    try {
      // Save user data to localStorage
      localStorage.setItem('userFirstName', firstName);
      localStorage.setItem('userLastName', lastName);
      localStorage.setItem('userEmail', email);

      // Sign up with auth service
      await this.auth.signUp(email, password);

      // Success alert
      await Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: 'Your account has been successfully created.',
        confirmButtonText: 'Continue',
      });

      this.router.navigateByUrl('/dashboard');
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      this.loading = false;
    }
  }
}
