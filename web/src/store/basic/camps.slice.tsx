import { createSlice } from "@reduxjs/toolkit";

interface Camps {
  id: string;
  name: string;
  address: string;
  info: string;
  coordinates: [number, number];
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

const germanyLabourCamps: Camps[] = [
  {
    id: "1",
    name: "Arbeitslager Dachau",
    address: "Alte Römerstraße 75, 85221 Dachau, Германия",
    info: "Один из первых нацистских концентрационных лагерей, основанный в 1933 году. Он использовался для политических заключенных, а позже был расширен, чтобы включать евреев, рома, синти и других заключенных.",
    coordinates: [48.2708, 11.4503],
  },
  {
    id: "2",
    name: "Arbeitslager Buchenwald",
    address: "Gedenkstätte Buchenwald, 99427 Веймар, Германия",
    info: "Нацистский концентрационный лагерь, основанный в 1937 году. Это был один из крупнейших концентрационных лагерей в Германии и местом многочисленных зверств.",
    coordinates: [51.0023, 11.2312],
  },
  {
    id: "3",
    name: "Arbeitslager Sachsenhausen",
    address: "Str. der Nationen 22, 16515 Ораниенбург, Германия",
    info: "Нацистский концентрационный лагерь, основанный в 1936 году. Это был один из главных концентрационных лагерей и использовался для политических заключенных, евреев и других групп.",
    coordinates: [52.7598, 13.2339],
  },
  {
    id: "4",
    name: "Arbeitslager Ravensbrück",
    address: "Noch-Str. 55, 16798 Фюрстенберг/Хафель, Германия",
    info: "Нацистский концентрационный лагерь, основанный в 1939 году, в основном для женщин. Это было место многочисленных зверств и медицинских экспериментов.",
    coordinates: [53.0447, 12.9047],
  },
];

const campsSlice = createSlice({
  name: "camps",
  initialState,
  reducers: {
    apiGetCamps(state) {
      state.camps = germanyLabourCamps;
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

export const { apiGetCamps, setSelectedPoint, setModalOpen } =
  campsSlice.actions;
export default campsSlice.reducer;
