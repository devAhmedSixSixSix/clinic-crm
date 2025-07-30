import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
  },
  {
    path: 'patient',
    loadComponent: () =>
      import('./pages/patient/patient').then((m) => m.Patient),
    canActivate: [authGuard],
  },
  {
    path: 'patient/:id',
    loadComponent: () =>
      import('./pages/patient-id/patient-id').then((m) => m.PatientId),
    canActivate: [authGuard],
  },
  {
    path: 'appointment',
    loadComponent: () =>
      import('./pages/appointment/appointment').then((m) => m.Appointment),
    canActivate: [authGuard],
  },
  {
    path: 'massages',
    loadComponent: () =>
      import('./pages/massages/massages').then((m) => m.Massages),
    canActivate: [authGuard],
  },
  {
    path: 'massages/:id',
    loadComponent: () =>
      import('./pages/massages-id/massages-id').then((m) => m.MassagesId),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile').then((m) => m.Profile),
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/sign-in/sign-in').then((m) => m.SignIn),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./pages/forget-password/forget-password').then(
        (m) => m.ForgetPassword
      ),
  },
  {
    path: '**',
    component: NotFound
  },
];
