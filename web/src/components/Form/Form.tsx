import React, { useDebugValue } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Form.module.scss";
import { apiGetOstarbaiterParam } from "../../api/ApiRequest";
import { useDispatch } from "react-redux";
import { apiGetPeople, setFilterPeople } from "../../store/basic/people.slice";
type Inputs = {
  surname: String;
  name: String;
  patronymic: String;
  date: String;
  localityWork: String;
  departure: String;
  profession: String;
  localityDeparture: String;
  dateDeparture: String;
};

export default function Form() {
  //! функция отправки запроса
  const dispacth = useDispatch();
  const appealApi = (data: Inputs) => {
    console.log(data);
    let param = "?";
    Object.keys(data).forEach((key) => {
      param += `${key}=${data[key as keyof Inputs]}&`;
    });
    param = param.slice(0, -1); // удаляем последний символ "/"
    apiGetOstarbaiterParam(param).then((req) => {
      if (req?.status === 200) {
        console.log("req s param", req);
        dispacth(setFilterPeople({ ostarbaiters: req.data?.ostarbaiters }));
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => appealApi(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {errors.lastName && errors.lastName.type === "maxLength" && (
        <span>Фамилия должна содержать не более 50 символов</span>
      )}
      {errors.lastName && errors.lastName.type === "required" && (
      <span>Поле обязательно к заполнению</span>
      )} */}
      <div className={styles.blockInput}>
        <div className={styles.blockFormFirst}>
          <input
            placeholder="Фамилия"
            maxLength={50}
            {...register("surname", { maxLength: 50 })}
          />
          <input
            placeholder="Отчество"
            maxLength={50}
            {...register("patronymic", { maxLength: 20 })}
          />
          <input
            placeholder="Имя"
            maxLength={50}
            {...register("name", { maxLength: 50 })}
          />
          <input
            placeholder="Год рождения"
            maxLength={50}
            {...register("date", { maxLength: 50 })}
          />
        </div>
        <div className={styles.blockFormSecond}>
          <input
            placeholder="Адрес проживания до угона в Германию"
            maxLength={50}
            {...register("departure", { maxLength: 50 })}
          />
          <input
            placeholder="Дата угона на принудительные работы в Германию"
            maxLength={50}
            {...register("dateDeparture", { maxLength: 20 })}
          />
          <input
            placeholder="Населенный пункт откуда угнан на принудительные работы"
            maxLength={50}
            {...register("localityDeparture", { maxLength: 50 })}
          />
          <input
            placeholder="Место трудоиспользования в Третьем рейхе"
            maxLength={50}
            {...register("localityWork", { maxLength: 50 })}
          />
        </div>
      </div>
      <div className={styles.SubmitButton}>
        <input type="submit" value="Найти" />
      </div>
    </form>
  );
}
