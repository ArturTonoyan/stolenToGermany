import { createSlice } from "@reduxjs/toolkit";

export interface Camps {
  count: number;
  locality: string;
  point: [number, number];
}

export interface SelectedPoint {
  id: string;
  menuOpen: boolean;
  count: number;
}

export interface CampsState {
  camps: Camps[];
  selectedPoint: SelectedPoint;
}

const initialState: CampsState = {
  camps: [],
  selectedPoint: { id: "", menuOpen: false, count: 0 },
};

const campsSlice = createSlice({
  name: "camps",
  initialState,
  reducers: {
    setCamps(state, actions) {
      const { camps } = actions.payload;
      console.log("camps", camps);
      let campsNew: Camps[] = [];
      camps?.map((el: any) => {
        const [longitude, latitude] = el.point.pos.split(" ").map(parseFloat);
        campsNew.push({
          count: el.count,
          locality: el.locality,
          point: [longitude, latitude],
        });
      });
      state.camps = campsNew;
    },

    setSelectedPoint(state, actions) {
      const { id } = actions.payload;
      state.selectedPoint.id = id;
    },

    setMapPeopleCount(state, actions) {
      const { count } = actions.payload;
      state.selectedPoint.count = count;
    },

    setModalOpen(state, actions) {
      const { action } = actions.payload;
      state.selectedPoint.menuOpen = action;
    },
  },
});

export const { setMapPeopleCount, setSelectedPoint, setModalOpen, setCamps } =
  campsSlice.actions;
export default campsSlice.reducer;
