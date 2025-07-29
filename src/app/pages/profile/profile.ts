import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInput } from '../../components/custom-input/custom-input';
import { FormBTN } from '../../components/form-btn/form-btn';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../core/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CustomInput, FormBTN, MatTabsModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  authService = inject(AuthService);

  avatarUrl: string | ArrayBuffer | null = localStorage.getItem('avatar') || null;

  form = new FormGroup({
    firstName: new FormControl(localStorage.getItem('userFirstName') || ''),
    lastName: new FormControl(localStorage.getItem('userLastName') || ''),
    phone: new FormControl(localStorage.getItem('phone') || ''),
    accountType: new FormControl(localStorage.getItem('accountType') || 'Doctor'),
    country: new FormControl(localStorage.getItem('country') || ''),
    city: new FormControl(localStorage.getItem('city') || ''),
    street: new FormControl(localStorage.getItem('street') || ''),
    zipCode: new FormControl(localStorage.getItem('zipCode') || ''),
  });

  passwordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  userFirstName: string | null = null;
  userLastName: string | null = null;
  accountType: string | null = null;

  ngOnInit(): void {
    this.userFirstName = localStorage.getItem('userFirstName');
    this.userLastName = localStorage.getItem('userLastName');
    this.accountType = localStorage.getItem('accountType');
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result;
        localStorage.setItem('avatar', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const values = this.form.value;

    localStorage.setItem('userFirstName', values.firstName || '');
    localStorage.setItem('userLastName', values.lastName || '');
    localStorage.setItem('phone', values.phone || '');
    localStorage.setItem('accountType', values.accountType || '');
    localStorage.setItem('country', values.country || '');
    localStorage.setItem('city', values.city || '');
    localStorage.setItem('street', values.street || '');
    localStorage.setItem('zipCode', values.zipCode || '');

    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'Your profile data has been saved successfully.',
      confirmButtonText: 'OK',
    }).then(() => {
      location.reload();
    });
  }

  async changePassword() {
    if (this.passwordForm.invalid) {
      Swal.fire('Error', 'All fields are required and password must be at least 6 characters.', 'error');
      return;
    }

    const { email, currentPassword, newPassword } = this.passwordForm.value;

    try {
      await this.authService.reauthenticate(email!, currentPassword!);
      await this.authService.changePassword(newPassword!);
      Swal.fire('Success', 'Password changed successfully!', 'success');
      this.passwordForm.reset();
    } catch (error: any) {
      console.error(error);
      Swal.fire('Error', error.message || 'Failed to change password.', 'error');
    }
  }
}
