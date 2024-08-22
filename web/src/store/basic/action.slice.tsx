import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ActionState {
  action: boolean;
}

const initialState: ActionState = {
  action: false,
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    openClodeAction(state) {
      state.action = !state.action;
    },
    closeAction(state) {
      state.action = false;
    },

    openAction(state) {
      state.action = true;
    },
  },
});

export const { openAction, openClodeAction, closeAction } = actionSlice.actions;
export default actionSlice.reducer;
