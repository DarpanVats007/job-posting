import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { department } from "../postings/postingsApiSlice"

export interface DepartmentSliceState {
  value: department["label"][]
  status: "idle" | "loading" | "failed"
}

const initialState: DepartmentSliceState = {
  value: [],
  status: "idle",
}

export const departmentSlice = createAppSlice({
  name: "department",
  initialState,
  reducers: create => ({
    addDepartment: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.value.push(action.payload)
    }),
    removeDepartment: create.reducer(
      (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(department => department!== action.payload)
    }),
    removeAllDepartments: create.reducer(
      (state) => {
        state.value = []
      },
    ),
  }),
  selectors: {
    selectDepartment: department => department.value,
    selectStatus: department => department.status,
  },
})

export const { addDepartment, removeDepartment, removeAllDepartments } =
  departmentSlice.actions

export const { selectDepartment, selectStatus } = departmentSlice.selectors
