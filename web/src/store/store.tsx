import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import peopleReducer, { PeopleState } from "./basic/people.slice";

// Определяем тип корневого состояния
export interface RootState {
  peopleSlice: PeopleState;
}

// Определяем корневой редьюсер
const rootReducer: Reducer<RootState> = combineReducers({
  peopleSlice: peopleReducer,
});

// Создаем хранилище
const store = configureStore({
  reducer: rootReducer,
});

// Определяем тип диспетчера
export type AppDispatch = typeof store.dispatch;

export default store;
