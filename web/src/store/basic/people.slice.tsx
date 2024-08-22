import { createSlice } from "@reduxjs/toolkit";

export interface Person {
  date: string;
  id: string;
  localityDeparture: string;
  name: string;
  patronymic: string;
  profession: string;
  surname: string;
}

export interface PeopleState {
  people: Person[];
  filterPeople: Person[];
  selectedPerson: string;
}

const initialState: PeopleState = {
  people: [],
  filterPeople: [],
  selectedPerson: "",
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    apiGetPeople(state, action) {
      state.people = action.payload.ostarbaiters;
      state.filterPeople = action.payload.ostarbaiters;
    },

    setFilterPeople(state, action) {
      state.filterPeople = action.payload.ostarbaiters;
    },

    setSelectedPerson(state, action) {
      console.log("action.payload.id", action.payload.id);
      state.selectedPerson = action.payload.id;
    },
  },
});

export const { apiGetPeople, setFilterPeople, setSelectedPerson } =
  peopleSlice.actions;
export default peopleSlice.reducer;
