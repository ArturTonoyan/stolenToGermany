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
  limit: [number, number];
  isLoading: boolean;
}
const cardWidth = 318;
const limCount = Math.floor((window.innerWidth - 98) / cardWidth) * 10;

const initialState: PeopleState = {
  people: [],
  filterPeople: [],
  selectedPerson: "",
  limit: [0, limCount],
  isLoading: false,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    apiGetPeople(state, action) {
      if (state.limit[0] === 0) {
        state.people = action.payload.ostarbaiters;
      } else {
        state.people.push(...action.payload.ostarbaiters);
        state.filterPeople = action.payload.ostarbaiters;
      }
    },

    resetPeople(state) {
      state.people = [];
      state.limit = [0, limCount];
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

    setLimitPlus(state) {
      state.limit = [state.limit[1] + 1, state.limit[1] + limCount + 1];
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
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
  resetPeople,
  setLimitPlus,
  setIsLoading,
  resetLimit,
} = peopleSlice.actions;
export default peopleSlice.reducer;
