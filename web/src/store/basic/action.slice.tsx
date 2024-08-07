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
  },
});

export const { openClodeAction, closeAction } = actionSlice.actions;
export default actionSlice.reducer;
