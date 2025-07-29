import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService, PeriodicElement } from '../../services/patient';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AppointmentCard } from "../../components/appointment-card/appointment-card";
import { TableSatusCard } from "../../components/table-satus-card/table-satus-card";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-id',
  standalone: true,
  imports: [CommonModule, CdkAccordionModule, AppointmentCard, TableSatusCard],
  templateUrl: './patient-id.html',
  styleUrls: ['./patient-id.css'],
})
export class PatientId {
  patient?: PeriodicElement;

  constructor(private route: ActivatedRoute, private patientService: PatientService) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patient = this.patientService.getPatientById(id);
    }
  }

  items = ['prescription', 'Laboratory Tests', 'scans'];
  expandedIndex = 0;

  openEditPopup() {
    if (!this.patient) return;

    const allPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patientIndex = allPatients.findIndex((p: any) => p.id === this.patient!.id);
    if (patientIndex === -1) {
      Swal.fire('Error', 'Patient not found in localStorage!', 'error');
      return;
    }

    const p = allPatients[patientIndex];

    Swal.fire({
      title: 'Edit Patient Data',
      html: `
  <div class="text-left grid grid-cols-1 lg:grid-cols-2 gap-4">
         <div>
            <label class="block" for="id">ID</label>
            <input id="id" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.id}" readonly>
          </div>
        <div>
          <label class="block" for="patientNum">Patient Number</label>
          <input id="patientNum" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.patientNum}">
        </div>
        <div>
          <label class="block" for="name">Name</label>
          <input id="name" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.patientInfo.name}">
        </div>
        <div>
          <label class="block" for="gender">Gender</label>
          <select id="gender" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]">
            <option value="Male" ${p.patientInfo.gender === 'Male' ? 'selected' : ''}>Male</option>
            <option value="Female" ${p.patientInfo.gender === 'Female' ? 'selected' : ''}>Female</option>
          </select>
        </div>

        <div>
          <label class="block" for="birtday">Birthday</label>
          <input id="birtday" type="date" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.patientInfo.birtday}">
        </div>
        <div>
          <label class="block" for="phone">Phone</label>
          <input id="phone" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.patientInfo.phone}">
        </div>
        <div>
          <label class="block" for="mail">Email</label>
          <input id="mail" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.patientInfo.mail}">
        </div>
        <div>
          <label class="block" for="address">Address</label>
          <input id="address" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.patientInfo.address}">
        </div>
        <div>
          <label class="block" for="userImg">User Image</label>
          <input id="userImg" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.patientInfo.userImg}">
        </div>
        <div>
          <label class="block" for="diagnosis">Diagnosis</label>
          <input id="diagnosis" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.diagnosis[0].diagnosisType}">
        </div>
        <div>
          <label class="block" for="age">Age</label>
          <input id="age" type="number" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${p.age}">
        </div>

        <div>
          <label class="block" for="status">Status</label>
          <select id="status" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]">
            <option value="Hospital" ${p.status === 'Hospital' ? 'selected' : ''}>Hospital</option>
            <option value="Healthy" ${p.status === 'Healthy' ? 'selected' : ''}>Healthy</option>
            <option value="Consulting" ${p.status === 'Consulting' ? 'selected' : ''}>Consulting</option>
          </select>
        </div>
        
      </div>

      <hr class="my-3">

      <div class="text-left">
        <label class="block" for="newPrescriptionImg">Add new prescription image</label>
        <input id="newPrescriptionImg" type="file" accept="image/*" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]">

        <label class="block" for="newLabImg" class="mt-2 block">Add new lab test image</label>
        <input id="newLabImg" type="file" accept="image/*" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]">

        <label class="block" for="newScanImg" class="mt-2 block">Add new scan image</label>
        <input id="newScanImg" type="file" accept="image/*" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]">
      </div>
    `,
      width: 900,
      confirmButtonText: 'Save',
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: async () => {
        const get = (id: string) => {
          const el = document.getElementById(id);
          if (!el) return '';
          if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) {
            return el.value;
          }
          return '';
        };

        const file = (id: string) => (document.getElementById(id) as HTMLInputElement)?.files?.[0];
        const today = new Date().toISOString().split('T')[0];

        const readFileAsBase64 = (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        };

        const updatedPrescription = [...(p.prescription || [])];
        const updatedLabs = [...(p.LaboratoryTests || [])];
        const updatedScans = [...(p.scans || [])];

        const prescriptionFile = file('newPrescriptionImg');
        if (prescriptionFile) {
          const base64 = await readFileAsBase64(prescriptionFile);
          updatedPrescription.push({ prescriptionImg: base64, date: today });
        }

        const labFile = file('newLabImg');
        if (labFile) {
          const base64 = await readFileAsBase64(labFile);
          updatedLabs.push({ LaboratoryTestsImg: base64, date: today });
        }

        const scanFile = file('newScanImg');
        if (scanFile) {
          const base64 = await readFileAsBase64(scanFile);
          updatedScans.push({ scansImg: base64, date: today });
        }

        const newDiagnosis = get('diagnosis');
        const updatedDiagnosis = [...(p.diagnosis || [])];
        if (newDiagnosis) {
          updatedDiagnosis.push({
            diagnosisType: newDiagnosis,
            diagnosisDate: today
          });
        }

        return {
          id: get('id'),
          patientNum: get('patientNum'),
          diagnosis: updatedDiagnosis,
          age: +get('age'),
          status: get('status'),
          patientInfo: {
            name: get('name'),
            gender: get('gender'),
            birtday: get('birtday'),
            phone: get('phone'),
            mail: get('mail'),
            address: get('address'),
            userImg: get('userImg'),
          },
          prescription: updatedPrescription,
          LaboratoryTests: updatedLabs,
          scans: updatedScans,
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        allPatients[patientIndex] = result.value;
        localStorage.setItem('patients', JSON.stringify(allPatients));
        this.patient = result.value;
        Swal.fire('Success', 'Patient data updated & new records added.', 'success');
      }
    });

  }
}
