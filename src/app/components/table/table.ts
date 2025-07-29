import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PatientService, PeriodicElement } from '../../services/patient';
import { TableSatusCard } from '../table-satus-card/table-satus-card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, TableSatusCard, RouterLink],
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class Table implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['patientNum', 'patientName', 'age', 'diagnosis', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  loadData() {
    this.dataSource.data = this.patientService.getAllPatients();
  }

  private generateNextId(): string {
    const all = this.patientService.getAllPatients();
    const numbers = all.map(p => parseInt(p.id.replace('N', ''))).filter(n => !isNaN(n));
    const nextNum = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
    return `N${nextNum.toString().padStart(4, '0')}`;
  }

  async addNewPatient() {
  const newId = this.generateNextId();

  const { value: formValues } = await Swal.fire({
    title: 'Add New Patient',
    html: `
      <form id="newPatientForm" class="text-left grid grid-cols-1 lg:grid-cols-2 gap-4 text-black">
        <div>
          <label class="block" for="id">ID</label>
          <input id="id" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${newId}" readonly required>
        </div>
        <div>
          <label class="block" for="patientNum">Patient Id Number</label>
          <input id="patientNum" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" value="${newId}" required>
        </div>
        <div>
          <label class="block" for="name">Name</label>
          <input id="name" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" required>
        </div>
        <div>
          <label class="block" for="gender">Gender</label>
          <select id="gender" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label class="block" for="birtday">Birthday</label>
          <input id="birtday" type="date" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" required>
        </div>
        <div>
          <label class="block" for="phone">Phone</label>
          <input id="phone" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" required>
        </div>
        <div>
          <label class="block" for="mail">Email</label>
          <input id="mail" type="email" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" required>
        </div>
        <div>
          <label class="block" for="address">Address</label>
          <input id="address" class="placeholder-[#9ca3af] placeholder:font-[500] mx-auto block outline-0 border border-[#EAECF0] rounded-[8px] p-[12px] w-full mt-[12px] mb-[16px]" required>
        </div>
      </form>
    `,
    width: 900,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      const form = document.getElementById('newPatientForm') as HTMLFormElement;
      if (!form.reportValidity()) return false;

      const getValue = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || '';

      const newPatient: PeriodicElement = {
        id: getValue('id'),
        patientNum: getValue('patientNum'),
        patientInfo: {
          name: getValue('name'),
          gender: getValue('gender'),
          birtday: getValue('birtday'),
          phone: getValue('phone'),
          mail: getValue('mail'),
          address: getValue('address'),
          userImg: getValue('userImg') || '/avatar.svg'
        },
        diagnosis: [{
          diagnosisType: getValue('diagnosis'),
          diagnosisDate: new Date().toISOString(),
        }],
        age: parseInt(getValue('age')) || 0,
        status: getValue('status'),
        prescription: [],
        LaboratoryTests: [],
        scans: [],
      };

      return newPatient;
    },
  });

  if (formValues) {
    this.patientService.addPatient(formValues);
    this.loadData();
    Swal.fire('Success', 'New patient added successfully.', 'success');
  }
}

}
