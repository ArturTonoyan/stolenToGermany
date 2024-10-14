import { createSlice } from "@reduxjs/toolkit";

// const cardHeight = 470;
const cardWidth = 318;
const limCount = Math.floor((window.innerWidth - 98) / cardWidth) * 4;

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
  limit: number[];
}

const initialState: PeopleState = {
  people: [],
  filterPeople: [],
  selectedPerson: "",
  limit: [0, limCount],
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    apiGetPeople(state, action) {
      state.people = [...state.people, ...action.payload.ostarbaiters];
      console.log("action.payload.ostarbaiters", action.payload.ostarbaiters);
      state.filterPeople = action.payload.ostarbaiters;
      if (action.payload.ostarbaiters?.length > limCount - 1) {
        state.limit = [
          state.limit[0] + limCount + 1,
          state.limit[1] + limCount + 1,
        ];
      }
    },

    setFilterPeople(state, action) {
      state.filterPeople = action.payload.ostarbaiters;
    },

    setSelectedPerson(state, action) {
      console.log("action.payload.id", action.payload.id);
      state.selectedPerson = action.payload.id;
    },

    resetFilterPeople(state) {
      state.filterPeople = state.people;
    },

    setLimit(state, action) {
      const { start, end } = action.payload;
      state.limit = [start, end];
    },

    setLimitPlus(state) {
      if (state.filterPeople.length > limCount - 1) {
        state.limit = [
          state.limit[0] + limCount + 1,
          state.limit[1] + limCount + 1,
        ];
      }
    },

    resetLimit(state) {
      state.limit = [0, limCount];
    },
  },
});

export const {
  resetFilterPeople,
  apiGetPeople,
  setFilterPeople,
  setSelectedPerson,
  setLimit,
  setLimitPlus,
  resetLimit,
} = peopleSlice.actions;
export default peopleSlice.reducer;
