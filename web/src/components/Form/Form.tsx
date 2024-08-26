import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Form.module.scss";
import { apiGetOstarbaiterParam } from "../../api/ApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setFilterPeople } from "../../store/basic/people.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { resetAction, setFormData } from "../../store/form/form.slice";
import { RootState } from "../../store/store";
import { openAction } from "../../store/basic/action.slice";
import { useEffect } from "react";
type Inputs = {
  surname: string;
  name: string;
  patronymic: string;
  date: string;
  localityWork: string;
  departure: string;
  profession: string;
  localityDeparture: string;
  dateDeparture: string;
};

export default function Form() {
  const store = useSelector((state: RootState) => state.formSlice);

  //! функция отправки запроса
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const appealApi = (data: Inputs) => {
    console.log(data);

    //! записываем в стор
    dispacth(setFormData({ data }));

    if (pathname.split("/").pop() !== "SearchModule") {
      navigate("/SearchPage/SearchModule");
      dispacth(openAction());
    }
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

  //! отслеживаем сброс данных
  useEffect(() => {
    if (store.resetAction === true) {
      reset();
      dispacth(resetAction());
    }
  }, [store.resetAction]);

  const {
    register,
    reset,
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
            defaultValue={store.formData.surname || ""}
            {...register("surname", { maxLength: 50 })}
          />
          <input
            placeholder="Отчество"
            defaultValue={store.formData.patronymic || ""}
            maxLength={50}
            {...register("patronymic", { maxLength: 20 })}
          />
          <input
            placeholder="Имя"
            maxLength={50}
            defaultValue={store.formData.name || ""}
            {...register("name", { maxLength: 50 })}
          />
          <input
            placeholder="Год рождения"
            defaultValue={store.formData.date || ""}
            maxLength={50}
            {...register("date", { maxLength: 50 })}
          />
        </div>
        <div className={styles.blockFormSecond}>
          <input
            className={styles.bigInp}
            placeholder="Адрес проживания до угона на принудительные работы в Германию"
            maxLength={150}
            defaultValue={store.formData.departure || ""}
            {...register("departure")}
          />
          <input
            placeholder="Дата угона на принудительные работы в Германию"
            defaultValue={store.formData.dateDeparture || ""}
            maxLength={50}
            {...register("dateDeparture", { maxLength: 20 })}
          />
          <input
            placeholder="Населенный пункт откуда угнан на принудительные работы"
            maxLength={50}
            defaultValue={store.formData.localityDeparture || ""}
            {...register("localityDeparture", { maxLength: 50 })}
          />
          <input
            placeholder="Место трудоиспользования в Третьем рейхе"
            maxLength={50}
            defaultValue={store.formData.localityWork || ""}
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
