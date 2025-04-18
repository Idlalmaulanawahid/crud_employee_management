import { createReducer, on } from "@ngrx/store"

//actions
import * as EmployeeAction from "./employee-state.action";
import { EmployeeState } from "../../models/model";


//initial global state
export const initialStateEmployee: EmployeeState = {
    isSearchControl: '',
    employee: [
    ],
    isLoading: false,
    error: ""
};

//reducers
export const employeeReducers = createReducer(
    initialStateEmployee,
    on(EmployeeAction.createEmployee, (state, { employee }) => ({
        ...state,
        employee: [...state.employee, ...employee] // Tambahkan karyawan baru ke daftar
    })),
    on(EmployeeAction.updatedEmployee, (state, { changes }) => {
        return {...state, ...changes};
    })
); 