//? Здесь все запросы к апи, присвоение этих данных состояниями в AssingApiData

import axios from "axios";
// const server = "https://workload.sfedu.ru";
const server = "http://localhost:3001";
const http = axios.create({
  withCredentials: true,
});

//! получаем людей
export const apiOstarbaiters = async () => {
  try {
    const response = await http.get(`${server}/ostarbaiters`);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! получаем человека
export const apiGetOstarbaiter = async (param) => {
  try {
    const response = await http.get(`${server}/ostarbaiters/${param}`);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const CreateEducator = async (data) => {
  try {
    const response = await http.post(`${server}/educator/`, data);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return error;
    //throw error;
  }
};

//! запрос на добавление преподавателя к нагрузке
export const addEducatorWorkload = async (data) => {
  console.log("Добавление преподавателя ", data);
  try {
    const response = await http.patch(`${server}/workload/faculty`, data);
    console.log("response ", response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    //throw error;
  }
};

//! запрос на удаление нагрузки
export const deleteWorkload = async (data) => {
  console.log("Нагрузки удалены ", data);
  try {
    const response = await http.delete(
      `${server}/workload/deleteSeveralWorkloads`,
      { data: data }
    );
    console.log("response ", response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    //throw error;
  }
};

//! запрос на изменени данных в админке
export const apiAdminUpdata = async (data) => {
  console.log("изменение данных админке ", data);
  try {
    const response = await http.put(`${server}/user/${data.id}/update`, {
      [data.key]: data.value,
    });
    console.log("response ", response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    //throw error;
  }
};
