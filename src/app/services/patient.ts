import { Injectable } from '@angular/core';

export interface PeriodicElement {
  id: string;
  patientNum: string;
  patientInfo: {
    name: string;
    gender: 'Male' | 'Female' | string;
    birtday: string;
    phone: string;
    mail: string;
    address: string;
    userImg: string;
  };
  diagnosis: {
    diagnosisType: string,
    diagnosisDate: string,
  }[];
  age: number;
  status: string;
  prescription: { prescriptionImg: string; date: string }[];
  LaboratoryTests: { LaboratoryTestsImg: string; date: string }[];
  scans: { scansImg: string; date: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: PeriodicElement[] = [];

  constructor() {
    this.loadPatients();
  }

  private loadPatients(): void {
    const stored = localStorage.getItem('patients');

    if (stored) {
      try {
        this.patients = JSON.parse(stored);
      } catch (err) {
        console.error('Failed to parse patients from localStorage:', err);
        this.setDefaultPatients();
      }
    } else {
      this.setDefaultPatients();
    }
  }

  private setDefaultPatients(): void {
    this.patients = this.getDefaultPatients();
    this.saveToLocalStorage();
  }

  private getDefaultPatients(): PeriodicElement[] {
    return [
      {
        id: 'N0001',
        patientNum: 'N0001',
        patientInfo: {
          name: 'Ahmad Lipshutz',
          gender: 'Male',
          birtday: '1999-07-26',
          phone: '+1-555-0101',
          mail: 'ahmadlipshutz@gmail.com',
          address: '123 Cedar Lane, New York, NY',
          userImg: '/avatar.svg',
        },
        diagnosis: [{
          diagnosisType: 'Stroke',
          diagnosisDate: "2025-07-29",
        }],
        age: 25,
        status: 'Healthy',
        prescription: [{ prescriptionImg: '/6331030221708601045.jpg', date: '2025/02/28' }],
        LaboratoryTests: [{ LaboratoryTestsImg: '/images.jpeg', date: '2025/02/28' }],
        scans: [{ scansImg: '/images (1).jpeg', date: '2025/02/28' }],
      },
      {
        id: 'N0002',
        patientNum: 'N0002',
        patientInfo: {
          name: 'Sara Morrison',
          gender: 'Female',
          birtday: '1985-03-14',
          phone: '+1-555-0102',
          mail: 'saramorrison@example.com',
          address: '456 Maple Street, Los Angeles, CA',
          userImg: 'avatar.svg',
        },
        diagnosis: [{
          diagnosisType: 'Stroke',
          diagnosisDate: "2025-07-29",
        }],
        age: 39,
        status: 'Hospital',
        prescription: [
          { prescriptionImg: '/6331030221708601045.jpg', date: '2025/02/28' },
          { prescriptionImg: '/6331030221708601045.jpg', date: '2025/02/28' }

        ],
        LaboratoryTests: [{ LaboratoryTestsImg: '/images.jpeg', date: '2025/02/28' }],
        scans: [{ scansImg: '/images (1).jpeg', date: '2025/02/28' }],
      },
    ];
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('patients', JSON.stringify(this.patients));
  }

  getAllPatients(): PeriodicElement[] {
    return this.patients;
  }

  getPatientById(id: string): PeriodicElement | undefined {
    return this.patients.find((p) => p.id === id);
  }

  updatePatient(updated: PeriodicElement): void {
    const index = this.patients.findIndex((p) => p.id === updated.id);
    if (index !== -1) {
      this.patients[index] = updated;
      this.saveToLocalStorage();
    }
  }

  addPatient(newPatient: PeriodicElement): void {
    this.patients.push(newPatient);
    this.saveToLocalStorage();
  }

  deletePatient(id: string): void {
    this.patients = this.patients.filter((p) => p.id !== id);
    this.saveToLocalStorage();
  }

  resetToDefault(): void {
    this.setDefaultPatients();
  }
}
