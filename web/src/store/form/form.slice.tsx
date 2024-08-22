import { createSlice } from "@reduxjs/toolkit";

export interface Inputs {
  surname: string;
  name: string;
  patronymic: string;
  date: string;
  localityWork: string;
  departure: string;
  profession: string;
  localityDeparture: string;
  dateDeparture: string;
}

export interface formState {
  formData: Inputs;
}

const formDataNull = {
  surname: "",
  name: "",
  patronymic: "",
  date: "",
  localityWork: "",
  departure: "",
  profession: "",
  localityDeparture: "",
  dateDeparture: "",
};

const initialState: formState = {
  formData: formDataNull,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload.data;
    },

    resetForm(state) {
      state.formData = formDataNull;
    },
  },
});

export const { setFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
