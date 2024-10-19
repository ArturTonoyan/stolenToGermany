import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

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
  searchParam: string;
  searchParamAdmin: string;
  count: number;
}
const cardWidth = 318;
export const limCount = Math.floor((window.innerWidth - 98) / cardWidth) * 10;

const initialState: PeopleState = {
  people: [],
  filterPeople: [],
  selectedPerson: "",
  limit: [1, limCount],
  isLoading: false,
  searchParam: "",
  searchParamAdmin: "",
  count: 50000,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    apiGetPeople(state, action) {
      state.people.push(...action.payload.ostarbaiters);
      state.filterPeople = action.payload.ostarbaiters;
    },

    setCount(state, action) {
      state.count = action.payload.count;
    },

    setSearchParam(state, action) {
      state.searchParam = action.payload.searchParam;
      state.people = [];
      state.limit = [1, limCount];
    },
    setSearchParamAdmin(state, action) {
      state.searchParamAdmin = action.payload.searchParamAdmin;
      state.people = [];
      state.limit = [1, limCount];
    },

    apiGetPeopleSearch(state, action) {
      state.people = action.payload.ostarbaiters;
    },

    resetPeople(state) {
      state.people = [];
      state.limit = [1, limCount];
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

    deletePeople(state, action) {
      const { id } = action.payload;
      state.people = state.people.filter((el) => el.id !== id);
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
      state.limit = [1, limCount];
    },
  },
});

export const {
  resetFilterPeople,
  apiGetPeople,
  apiGetPeopleSearch,
  setFilterPeople,
  setSelectedPerson,
  deletePeople,
  resetPeople,
  setLimitPlus,
  setIsLoading,
  resetLimit,
  setSearchParam,
  setSearchParamAdmin,
  setCount,
} = peopleSlice.actions;
export default peopleSlice.reducer;
