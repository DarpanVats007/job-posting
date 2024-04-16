import type { PayloadAction } from "@reduxjs/toolkit"
import type { Posting } from "../postings/postingsApiSlice"
import { createAppSlice } from "../../app/createAppSlice"

export interface JobSliceState {
  value: Posting[][]
  status: "idle" | "loading" | "failed"
}

const initialState: JobSliceState = {
  value: [],
  status: "idle",
}

export const JobSlice = createAppSlice({
  name: "Job",
  initialState,
  reducers: create => ({
    addJob: create.reducer(
      (state, action: PayloadAction<Posting[]>) => {
        state.value.push(action.payload.flat())
    }),
    removeJob: create.reducer(
      (state, action: PayloadAction<Posting[]>) => {
      state.value = state.value.filter(Job => Job!== action.payload)
    }),
    removeAllJobs: create.reducer(
      (state) => {
        state.value = []
      },
    ),
  }),
  selectors: {
    selectJob: Job => Job.value,
    selectStatus: Job => Job.status,
  },
})

export const { addJob, removeJob, removeAllJobs } =
  JobSlice.actions

export const { selectJob, selectStatus } = JobSlice.selectors
