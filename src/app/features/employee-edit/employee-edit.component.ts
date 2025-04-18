import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/empolyee.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../core/models/model'; // Import the interface

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    FormsModule,
  ],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export default class EmployeeEditComponent {
  employee: Employee | undefined;
  today: string = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployees().subscribe(data => {
      this.employee = data.find(emp => emp.id === id);
    });
  }

  updateEmployee() {
    if (this.employee) {
      this.employeeService.editEmployee(this.employee);
      this.router.navigate(['/list-employee']);
    }
  }
  cancel() {
    this.router.navigate(['/list-employee']);
  }
}
