import type { DepartmentModel } from "../postings";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export type DepartmentSliceState = {
  value: DepartmentModel[];
  status: "idle" | "loading" | "failed";
};

const initialState: DepartmentSliceState = {
  value: [],
  status: "idle",
};

export const departmentSlice = createAppSlice({
  name: "department",
  initialState,
  reducers: (create) => ({
    addDepartment: create.reducer(
      (state, action: PayloadAction<DepartmentModel>) => {
        const existingDept = state.value.find(
          (dept) => dept.label === action.payload.label,
        );
        if (!existingDept) {
          state.value.push(action.payload);
        }
      },
    ),
    removeDepartment: create.reducer(
      (state, action: PayloadAction<DepartmentModel>) => {
        state.value = state.value.filter(
          (department) => department.id !== action.payload.id,
        );
      },
    ),
    removeAllDepartments: create.reducer((state) => {
      state.value = [];
    }),
  }),
  selectors: {
    selectDepartment: (department) => department.value,
    selectStatus: (department) => department.status,
  },
});

export const { addDepartment, removeDepartment, removeAllDepartments } =
  departmentSlice.actions;

export const { selectDepartment, selectStatus } = departmentSlice.selectors;
