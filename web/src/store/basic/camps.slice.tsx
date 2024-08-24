import { createSlice } from "@reduxjs/toolkit";

export interface Camps {
  locality: string;
  point: [number, number];
}

export interface SelectedPoint {
  id: string;
  menuOpen: boolean;
}

export interface CampsState {
  camps: Camps[];
  selectedPoint: SelectedPoint;
}

const initialState: CampsState = {
  camps: [],
  selectedPoint: { id: "", menuOpen: false },
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
          locality: el.locality,
          point: [latitude, longitude],
        });
      });
      state.camps = campsNew;
    },

    setSelectedPoint(state, actions) {
      const { id } = actions.payload;
      state.selectedPoint.id = id;
    },

    setModalOpen(state, actions) {
      const { action } = actions.payload;
      state.selectedPoint.menuOpen = action;
    },
  },
});

export const { setSelectedPoint, setModalOpen, setCamps } = campsSlice.actions;
export default campsSlice.reducer;
