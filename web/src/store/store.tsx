import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import peopleReducer, { PeopleState } from "./basic/people.slice";
import campsReducer, { CampsState } from "./basic/camps.slice";

// Определяем тип корневого состояния
export interface RootState {
  peopleSlice: PeopleState;
  campsSlice: CampsState;
}

// Определяем корневой редьюсер
const rootReducer: Reducer<RootState> = combineReducers({
  peopleSlice: peopleReducer,
  campsSlice: campsReducer,
});

// Создаем хранилище
const store = configureStore({
  reducer: rootReducer,
});

// Определяем тип диспетчера
export type AppDispatch = typeof store.dispatch;

export default store;
