import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "dashboard",
        loadComponent: () => {
            return import("./pages/dashboard/dashboard").then((m) => m.Dashboard)
        },

    },
    {
        path: "patient",
        loadComponent: () => {
            return import("./pages/patient/patient").then((m) => m.Patient)
        },

    },
    {
        path: "patient/:id",
        loadComponent: () => {
            return import("./pages/patient-id/patient-id").then((m) => m.PatientId)
        },

    },
    {
        path: "appointment",
        loadComponent: () => {
            return import("./pages/appointment/appointment").then((m) => m.Appointment)
        },

    },
    {
        path: "massages",
        loadComponent: () => {
            return import("./pages/massages/massages").then((m) => m.Massages)
        },

    },
        {
        path: "massages/:id",
        loadComponent: () => {
            return import("./pages/massages-id/massages-id").then((m) => m.MassagesId)
        },

    },
    {
        path: "profile",
        loadComponent: () => {
            return import("./pages/profile/profile").then((m) => m.Profile)
        },

    },

    {
        path: "signup",
        pathMatch: "full",
        loadComponent: () => {
            return import("./pages//sign-up/sign-up").then((m) => m.SignUp)
        },

    },
    {
        path: "",
        pathMatch: "full",
        loadComponent: () => {
            return import("./pages/sign-in/sign-in").then((m) => m.SignIn)
        },

    },
    {
        path: "forget-password",
        loadComponent: () => {
            return import("./pages/forget-password/forget-password").then((m) => m.ForgetPassword)
        },

    }
];
