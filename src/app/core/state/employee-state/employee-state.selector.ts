import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../appState.interface";

export const selectFeature = (state: AppStateInterface) => state.employee;

export const employeeSelector = createSelector(
    selectFeature, (state => {
       return state
    })
);