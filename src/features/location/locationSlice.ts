import type { department, location } from "../postings/postingsApiSlice"

import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface LocationSliceState {
  value: location[]
  status: "idle" | "loading" | "failed"
}

const initialState: LocationSliceState = {
  value: [],
  status: "idle",
}

export const locationSlice = createAppSlice({
  name: "location",
  initialState,
  reducers: create => ({
    addLocation: create.reducer(
      (state, action: PayloadAction<location>) => {
        state.value.push(action.payload)
    }),
    removeLocation: create.reducer(
      (state, action: PayloadAction<location>) => {
      state.value = state.value.filter(location => location!== action.payload)
    }),
    removeAllLocations: create.reducer(
      (state) => {
        state.value = []
      },
    ),
  }),
  selectors: {
    selectLocation: location => location.value,
    selectStatus: location => location.status,
  },
})

export const { addLocation, removeLocation, removeAllLocations } =
  locationSlice.actions

export const { selectLocation, selectStatus } = locationSlice.selectors
