import { createSlice } from "@reduxjs/toolkit";
import { apiOstarbaiters } from "../../api/ApiRequest";

interface Person {
  id: number;
  name: string;
  address: string;
  post: string;
  birthData: string;
  campsId: string;
}

export interface PeopleState {
  people: Person[];
}

const initialState: PeopleState = {
  people: [],
};

const people = [
  {
    id: 1,
    name: "Ирклиенко Михаил Иванович",
    address: "г. Таганрог",
    post: "Рабочий",
    birthData: "1908",
    campsId: "1",
  },
  {
    id: 2,
    name: "Петров Иван Сергеевич",
    address: "г. Москва",
    post: "Менеджер",
    birthData: "1985",
    campsId: "2",
  },
  {
    id: 3,
    name: "Смирнова Анна Александровна",
    address: "г. Санкт-Петербург",
    post: "Бухгалтер",
    birthData: "1992",
    campsId: "3",
  },
  {
    id: 4,
    name: "Кузнецов Андрей Дмитриевич",
    address: "г. Новосибирск",
    post: "Инженер",
    birthData: "1975",
    campsId: "4",
  },
  {
    id: 5,
    name: "Иванова Мария Сергеевна",
    address: "г. Екатеринбург",
    post: "Администратор",
    birthData: "1988",
    campsId: "3",
  },
  {
    id: 6,
    name: "Соколов Михаил Александрович",
    address: "г. Краснодар",
    post: "Водитель",
    birthData: "1982",
    campsId: "2",
  },
  {
    id: 7,
    name: "Белова Ольга Павловна",
    address: "г. Ростов-на-Дону",
    post: "Врач",
    birthData: "1990",
    campsId: "1",
  },
  {
    id: 8,
    name: "Александров Дмитрий Игоревич",
    address: "г. Нижний Новгород",
    post: "Программист",
    birthData: "1987",
    campsId: "1",
  },
  {
    id: 9,
    name: "Сидорова Елена Викторовна",
    address: "г. Казань",
    post: "Преподаватель",
    birthData: "1979",
    campsId: "1",
  },
  {
    id: 10,
    name: "Николаев Павел Андреевич",
    address: "г. Волгоград",
    post: "Менеджер",
    birthData: "1983",
    campsId: "1",
  },
  {
    id: 11,
    name: "Ковалева Наталья Сергеевна",
    address: "г. Уфа",
    post: "Бухгалтер",
    birthData: "1991",
    campsId: "1",
  },
  {
    id: 12,
    name: "Федоров Андрей Владимирович",
    address: "г. Пермь",
    post: "Инженер",
    birthData: "1978",
    campsId: "1",
  },
  {
    id: 13,
    name: "Маркова Анастасия Игоревна",
    address: "г. Воронеж",
    post: "Администратор",
    birthData: "1989",
    campsId: "1",
  },
  {
    id: 14,
    name: "Захаров Сергей Михайлович",
    address: "г. Самара",
    post: "Водитель",
    birthData: "1980",
    campsId: "1",
  },
  {
    id: 15,
    name: "Павлова Мария Максимовна",
    address: "г. Челябинск",
    post: "Врач",
    birthData: "1993",
    campsId: "1",
  },
];

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    apiGetPeople(state) {
      apiOstarbaiters().then((req) => {
        if (req?.status === 200) {
          state.people = req.data;
        }
      });
    },
  },
});

export const { apiGetPeople } = peopleSlice.actions;
export default peopleSlice.reducer;
