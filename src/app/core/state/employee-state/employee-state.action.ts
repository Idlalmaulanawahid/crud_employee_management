import { createAction,props } from "@ngrx/store";
import { Employee, EmployeeState } from "../../models/model";

export const createEmployee = createAction('[Employee] Create Employee', props<{employee: Employee[]}>());
export const createEmployeeFailed = createAction('[Employee] Create Employee Failed', props<{error: string}>());
export const updatedEmployee = createAction('[Employee] Change Employee',props<{ changes: Partial<EmployeeState> }>());