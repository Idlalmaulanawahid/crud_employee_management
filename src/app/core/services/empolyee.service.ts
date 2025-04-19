import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Employee, Group } from '../../core/models/model'; // Import the interface
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private group: Group[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
  private groupsSubject = new BehaviorSubject<Group[]>(this.group);

  constructor(private http: HttpClient) {
    this.loadEmployeesFromJson();
    this.loadGroupFromJson();
  }
  loadGroupFromJson(): void {
    this.http.get<Group[]>('assets/json/group.json', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
          'Accept': 'application/json',
      }),
      observe: 'response',
      withCredentials: true,
    })
      .pipe(
        tap((response) => {
          this.group = response.body ?? [];
          this.groupsSubject.next(this.group); // Perbarui BehaviorSubject
        })
      )
      .subscribe();
  }
  
  getGroups(): Observable<Group[]> {
    return this.groupsSubject.asObservable();
  }

  private loadEmployeesFromJson(): void {
    this.http.get<Employee[]>('assets/json/employee.json', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      observe: 'response', // Memungkinkan untuk mendapatkan status dan body
      withCredentials: true,
    }) // Path ke file JSON
      .pipe(
        tap((response) => {
          this.employees = response.body ?? [];
          this.employeesSubject.next(this.employees);
        })
      )
      .subscribe();
  }


  
  getEmployees() {
    return this.employeesSubject.asObservable();
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
    this.employeesSubject.next(this.employees);
  }

  editEmployee(updatedEmployee: Employee) {
    const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.employeesSubject.next(this.employees);
    }
  }

  deleteEmployee(id: number): Observable<void> {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.employeesSubject.next(this.employees);
    return of(); // Return an Observable<void>
  }

  getEmployeeById(id: number) {
    const employee = this.employees.find(emp => emp.id === id);
    return employee ? [employee] : []; // Return an array for consistency
  }

}