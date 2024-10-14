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
      state.people.push(...action.payload.ostarbaiters);
      state.filterPeople = action.payload.ostarbaiters;
    },

    resetPeople(state) {
      state.people = [];
    },

    setFilterPeople(state, action) {
      state.filterPeople = action.payload.ostarbaiters;
    },

    setSelectedPerson(state, action) {
      state.selectedPerson = action.payload.id;
    },

    resetFilterPeople(state) {
      state.filterPeople = state.people;
    },

    // setLimit(state, action) {
    //   const { start, end } = action.payload;
    //   state.limit = [start, end];
    // },

    // setLimitPlus(state) {
    //   if (state.filterPeople.length > limCount - 1) {
    //     state.limit = [
    //       state.limit[0] + limCount + 1,
    //       state.limit[1] + limCount + 1,
    //     ];
    //   }
    // },

    // resetLimit(state) {
    //   state.limit = [0, limCount];
    // },
  },
});

export const {
  resetFilterPeople,
  apiGetPeople,
  setFilterPeople,
  setSelectedPerson,
  resetPeople,
} = peopleSlice.actions;
export default peopleSlice.reducer;
