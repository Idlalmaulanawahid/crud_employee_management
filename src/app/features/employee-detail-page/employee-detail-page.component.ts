import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/empolyee.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-employee-detail-page',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './employee-detail-page.component.html',
  styleUrl: './employee-detail-page.component.css'
})
export default class EmployeeDetailPageComponent {
  employee: any; // Define the type according to your employee model
  previousSearch: string | null = null;

  constructor(
    private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    this.previousSearch = this.route.snapshot.queryParamMap.get('search'); // Get previous search query
    this.getEmployeeDetails(Number(employeeId));
  }

  getEmployeeDetails(id: number): void {
    const employeeData = this.employeeService.getEmployeeById(id);
    if (employeeData.length > 0) {
      this.employee = employeeData[0]; // Get the first employee from the array
    } else {
      console.error('Employee not found');
      // Handle the case where the employee is not found
    }
  }

  navigateBack(): void {
    this.router.navigate(['/list-employees'], { queryParams: { search: this.previousSearch } });
  }
}
