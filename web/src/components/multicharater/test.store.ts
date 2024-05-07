import { AppState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CharacterSelector {
  charselect: any;
}

const initialState: CharacterSelector = {
  charselect: {
    visible: false,
    index : -1,
  },
};

export const CharacterSlect = createSlice({
  name: "charselect",
  initialState,
  reducers: {
    setMulticharacter: (state, action: PayloadAction<any>) => {
      state.charselect = action.payload;
    },
  },
  extraReducers: () => {},
});

export const Charselectstore = (state: AppState) => state.charselect.charselect;
export const {
  setMulticharacter,
} = CharacterSlect.actions;

export default CharacterSlect.reducer;
