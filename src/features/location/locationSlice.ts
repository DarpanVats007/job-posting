import type { LocationModel } from "../postings/postingsApiSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export type LocationSliceState = {
  value: LocationModel[];
  status: "idle" | "loading" | "failed";
};

const initialState: LocationSliceState = {
  value: [],
  status: "idle",
};

export const locationSlice = createAppSlice({
  name: "location",
  initialState,
  reducers: (create) => ({
    addLocation: create.reducer(
      (state, action: PayloadAction<LocationModel>) => {
        const existingLocation = state.value.find(
          (loc) => loc.city === action.payload.city,
        );
        if (!existingLocation) {
          state.value.push(action.payload);
        }
      },
    ),
    removeLocation: create.reducer(
      (state, action: PayloadAction<LocationModel>) => {
        state.value = state.value.filter(
          (location) => location.id !== action.payload.id,
        );
      },
    ),
    removeAllLocations: create.reducer((state) => {
      state.value = [];
    }),
  }),
  selectors: {
    selectLocation: (location) => location.value,
    selectStatus: (location) => location.status,
  },
});

export const { addLocation, removeLocation, removeAllLocations } =
  locationSlice.actions;

export const { selectLocation, selectStatus } = locationSlice.selectors;
