import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeService } from '../../core/services/empolyee.service';
import { Router } from '@angular/router';
import { Employee, EmployeeState } from '../../core/models/model'; // Import the interface
import { StorageService } from '../../core/services/storage.service';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../core/state/appState.interface';
import { Observable } from 'rxjs';
import { employeeSelector } from '../../core/state/employee-state/employee-state.selector';
import { updatedEmployee } from '../../core/state/employee-state/employee-state.action';

@Component({
  selector: 'app-employee-list-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatTooltipModule
  ],
  templateUrl: './employee-list-page.component.html',
  styleUrl: './employee-list-page.component.css'
})
export default class EmployeeListPageComponent implements OnInit {
  private readonly store: Store<AppStateInterface> = inject(Store);
  readonly employee$: Observable<EmployeeState> = this.store.select(employeeSelector);
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchControl: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: string = '';
  showDeletePopup: boolean = false;
  employeeToDelete: number | null = null;
  employeeData!: Employee[];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private employeeService: EmployeeService,
  ) {
  }

  ngOnInit() {

    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = this.employees;
    });
    this.getState()
  }

  getState() {
    this.employee$.subscribe((val) => {
      if (val.employee.length > 0) {
        this.filteredEmployees = val.employee;
        this.searchControl = val.isSearchControl;
      }
    });
  }

  logout() {
    sessionStorage.removeItem('isLoggedIn'); // Remove login status
    this.router.navigate(['/login']); // Redirect to login page
  }

  search() {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.firstName.toLowerCase().includes(this.searchControl.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(this.searchControl.toLowerCase()) ||
      employee.status.toLowerCase().includes(this.searchControl.toLowerCase()) ||
      employee.email.toLowerCase().includes(this.searchControl.toLowerCase())
    );
    this.currentPage = 1; // Reset to first page on search
    this.updateState();
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(start, start + this.itemsPerPage);
  }

  totalPages() {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  navigateToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }

  editEmployee(id: number) {
    this.router.navigate(['/edit-employee', id]);
  }

  confirmDelete(employeeId: number) {
    this.showDeletePopup = true;
    this.employeeToDelete = employeeId;
  }

  cancelDelete() {
    this.showDeletePopup = false;
    this.employeeToDelete = null;
  }

  deleteEmployee() {
    if (this.employeeToDelete !== null) {
      this.showDeletePopup = false; // Pastikan popup ditutup
      this.employeeService.deleteEmployee(this.employeeToDelete).subscribe((event) => {
        // Hapus karyawan dari daftar
        this.filteredEmployees = this.filteredEmployees.filter(emp => emp.id !== this.employeeToDelete);
        this.employees = this.employees.filter(emp => emp.id !== this.employeeToDelete);
        this.employeeToDelete = null; // Reset ID karyawan
      });
    }
  }

  sortData(column: string) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortColumn = column;

    this.filteredEmployees.sort((a, b) => {
      const aValue = a[column as keyof Employee];
      const bValue = b[column as keyof Employee];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  viewEmployeeDetails(id: number) {
    this.router.navigate(['/detail-employee', id]);
  }

  updateState() {
    this.store.dispatch(
      updatedEmployee({
        changes: {
          employee: this.filteredEmployees,
          isSearchControl: this.searchControl
        },
      })
    );
  }
}
