import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/empolyee.service';
import { Group } from '../../core/models/model';

@Component({
  selector: 'app-add-employee-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-employee-page.component.html',
  styleUrl: './add-employee-page.component.css'
})
export default class AddEmployeePageComponent {
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  status: string = '';
  birthDate: Date | null = null;
  basicSalary: number | null = null;
  description: string = '';
  today: string = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
  group: string | null = null;
  groupSearch: string = '';
  dropdownOpen: boolean = false;
  groupTouched: boolean = false;

  groups: Group[] = [];
  filteredGroups: Group[] = [...this.groups];

  constructor(private router: Router, private employeeService: EmployeeService) {
    this.filteredGroups = this.groups;
  }
  

  addEmployee() {
    const newEmployee = {
      id: Math.floor(Math.random() * 10000),
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate || new Date(),
      basicSalary: this.basicSalary || 0,
      status: this.status,
      group: this.group || '', // Assign an empty string if group is null
      description: this.description
    };
  
    this.employeeService.addEmployee(newEmployee!);
    this.router.navigate(['/list-employee']);
  }

  cancel() {
    this.router.navigate(['/list-employee']);
  }

  ngOnInit() {
    this.filterGroups();

    this.employeeService.loadGroupFromJson(); // Pastikan grup dimuat dari JSON
    this.employeeService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
    this.filteredGroups = this.groups;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.groupTouched = true; // Mark the field as touched when dropdown is opened
  }

  filterGroups() {
    this.filteredGroups = this.groups;
    this.filteredGroups = this.groups.filter(group =>
      group.label.toLowerCase().includes(this.groupSearch.toLowerCase())
    );
  }
  selectGroup(group: Group) {
    this.group = group.label; // Simpan nama grup atau properti yang sesuai
    this.dropdownOpen = false; // Tutup dropdown setelah pemilihan
  }
}
