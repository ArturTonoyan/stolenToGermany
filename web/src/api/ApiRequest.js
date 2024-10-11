import axios from "axios";

// const server = "https://ostarbaiters.ru/api"
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

//! получаем человека по id
export const apiGetOstarbaiter = async (param) => {
  try {
    const response = await http.get(`${server}/ostarbaiters/${param}`);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! получаем людей по расширенному поиску
export const apiGetOstarbaiterParam = async (param) => {
  try {
    const response = await http.get(`${server}/ostarbaiters/${param}`);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! запрос на авторизацию
export const Auth = async (data) => {
  try {
    const response = await http.post(`${server}/auth/login`, data);
    if (response && response.data && response.data.token) {
      // Устанавливаем токен в куки
      document.cookie = `auth._token.admin=Bearer ${response.data.token}; path=/;`;
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! поучаем адреса
export const apiGetAdress = async (data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token YOUR_API_KEY_HERE",
    };

    const response = await http.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      data,
      { headers }
    );

    if (response.status === 200) {
      return response.data.suggestions;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

//! Запрос на создание human
export const OstarbaitersCreate = async (data) => {
  try {
    const response = await http.post(`${server}/ostarbaiters`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//! получаем все метки на карте
export const apiGetCamps = async () => {
  try {
    const response = await http.get(`${server}/ostarbaiters/camps`);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! получаем людей по городу
export const apiGetPeopleCamps = async (param) => {
  try {
    const response = await http.get(`${server}/ostarbaiters/camps${param}`);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! проверка авторизации
export const apiCheckAuthorization = async () => {
  try {
    const response = await http.get(`${server}/auth/checkAuthorization`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

//! Запрос на удаление Human
export const OstarbaitersDelete = async (id) => {
  try {
    const response = await http.delete(`${server}/ostarbaiters/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//! Запрос на редактирование Human
export const OstarbaitersEdit = async (data, id) => {
  try {
    const response = await http.put(`${server}/ostarbaiters/${id}`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//! Запрос на добавление изображений Human
export const AddPhoto = async (data) => {
  try {
    const response = await http.post(`${server}/uploads`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const AddMorePhotoImg = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file); // Append each file to the FormData
  });
  try {
    const response = await http.post(`${server}/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

//! запрос на удаление нагрузки
export const apiDeleteFotoAdmin = async (data) => {
  console.log("data фотки", ...data);
  try {
    const response = await http.delete(`${server}/uploads${data}`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

// просто слеш для 1 img to body
// /image для архива files to body

// export const CreateEducator = async (data) => {
//   try {
//     const response = await http.post(`${server}/educator/`, data);
//     return response;
//   } catch (error) {
//     console.error("Error:", error);
//     return error;
//     //throw error;
//   }
// };

// //! запрос на добавление преподавателя к нагрузке
// export const addEducatorWorkload = async (data) => {
//   console.log("Добавление преподавателя ", data);
//   try {
//     const response = await http.patch(`${server}/workload/faculty`, data);
//     console.log("response ", response);
//     return response.data;
//   } catch (error) {
//     console.error("Error:", error);
//     //throw error;
//   }
// };

// //! запрос на изменени данных в админке
// export const apiAdminUpdata = async (data) => {
//   console.log("изменение данных админке ", data);
//   try {
//     const response = await http.put(`${server}/user/${data.id}/update`, {
//       [data.key]: data.value,
//     });
//     console.log("response ", response);
//     return response;
//   } catch (error) {
//     console.error("Error:", error);
//     //throw error;
//   }
// };
