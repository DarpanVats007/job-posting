import type { PayloadAction } from "@reduxjs/toolkit";
import type { Posting } from "../postings/postingsApiSlice";
import { createAppSlice } from "../../app/createAppSlice";

export interface JobListSliceState {
  value: Posting[][];
  status: "idle" | "loading" | "failed";
}

const initialState: JobListSliceState = {
  value: [],
  status: "idle",
};

export const JobListSlice = createAppSlice({
  name: "JobList",
  initialState,
  reducers: (create) => ({
    addJobList: create.reducer((state, action: PayloadAction<Posting[]>) => {
      state.value.push(action.payload.flat());
    }),
    removeJobList: create.reducer((state, action: PayloadAction<Posting[]>) => {
      state.value = state.value.filter((JobList) => JobList !== action.payload);
    }),
    removeAllJobLists: create.reducer((state) => {
      state.value = [];
    }),
  }),
  selectors: {
    selectJobList: (JobList) => JobList.value,
    selectStatus: (JobList) => JobList.status,
  },
});

export const { addJobList, removeJobList, removeAllJobLists } =
  JobListSlice.actions;

export const { selectJobList, selectStatus } = JobListSlice.selectors;
