
export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date; // Use `Date` for datetime
  basicSalary: number; // Use `number` for double
  status: string;
  group: string;
  description: string;
}

export interface Group {
  id: number;
  label: string;
  value: string;
}

export interface EmployeeState {
  isSearchControl: string;
  isLoading: boolean;
  employee : Employee[];
  error: string | null;
}