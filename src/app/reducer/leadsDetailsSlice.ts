import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface LeadsDetailsState {
  filtersArray: { key: string; value: string }[];
  leadDetailsRedux: any;
  leadsListRedux: any;
}

const initialState: LeadsDetailsState = {
  filtersArray: [],
  leadDetailsRedux: 0,
  leadsListRedux: [],
};

const LeadsDetailsSlice = createSlice({
  name: "leadsDetails",
  initialState,
  reducers: {
    setFiltersValue: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      if (action.payload.value === "") {
        state.filtersArray = state.filtersArray.filter(
          (val) => Object.keys(val)[0] !== action.payload.key
        );
        return;
      }
      let newObject: any = { [action.payload.key]: action.payload.value };
      let checkObj: any = state.filtersArray.find(
        (data: any) => Object.keys(data)[0] === action.payload.key
      );

      if (checkObj) {
        checkObj = Object.keys(checkObj)[0];
        state.filtersArray.map((newObj: any) => {
          if (Object.keys(newObj)[0] === checkObj)
            newObj[checkObj] = action.payload.value;
        });
      } else {
        state.filtersArray.push(newObject);
      }
    },
    setLeadsListRedux: (state, action: PayloadAction<[]>) => {
      state.leadsListRedux = [...action.payload];
    },
  },
});

export const { setFiltersValue, setLeadsListRedux } = LeadsDetailsSlice.actions;

export default LeadsDetailsSlice.reducer;
