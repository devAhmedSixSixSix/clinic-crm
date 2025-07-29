import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CustomTitleAndDescription } from '../../components/custom-title-and-description/custom-title-and-description';
import { CustomInput } from '../../components/custom-input/custom-input';
import { FormBTN } from '../../components/form-btn/form-btn';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CustomTitleAndDescription,
    CustomInput,
    FormBTN,
    CommonModule
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  fb = inject(FormBuilder);
  auth = inject(Auth);
  router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async signIn() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields correctly.',
      });
      return;
    }

    const { email, password } = this.form.value;

    try {
      await signInWithEmailAndPassword(this.auth, email!, password!);
      await Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        confirmButtonText: 'OK',
      });
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid email or password.',
      });
    }
  }
}
