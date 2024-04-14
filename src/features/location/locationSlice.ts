import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { location } from "../postings/postingsApiSlice"

export interface LocationSliceState {
  value: location["city"][]
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
      (state, action: PayloadAction<string>) => {
        state.value.push(action.payload)
    }),
    removeLocation: create.reducer(
      (state, action: PayloadAction<string>) => {
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
