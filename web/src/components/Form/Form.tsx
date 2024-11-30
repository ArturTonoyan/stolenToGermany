import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  limCount,
  resetLimit,
  setCount,
  setSearchParam,
  setSearchParamAdmin,
} from "../../store/basic/people.slice";
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

export default function Form(props: any) {
  const store = useSelector((state: RootState) => state.formSlice);
  // const peopleStore = useSelector((state: RootState) => state.peopleSlice);

  //! функция отправки запроса
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const appealApi = (data: Inputs) => {
    //! записываем в стор
    dispacth(setFormData({ data }));
    if (
      pathname.split("/").pop() !== "SearchModule" &&
      pathname.split("/").pop() !== "AdminSearchResult"
    ) {
      navigate("/SearchPage/SearchModule");
      dispacth(openAction());
    }
    let param = "";
    Object.keys(data).forEach((key) => {
      param += `${key}=${data[key as keyof Inputs]}&`;
    });
    if (props.isAdmin) {
      dispacth(setSearchParamAdmin({ searchParam: param }));
    } else {
      dispacth(setSearchParam({ searchParam: param }));
    }
    dispacth(resetLimit());
    props.funUpdatePeop(param, 1, limCount, 50000);
    // props.setCount(50000);
    dispacth(setCount({ count: 50000 }));
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
      <div className={styles.blockInput}>
        {!props.isFunction && (
          <img
            onClick={props.funOpenBigSearch}
            src={
              !props.isActionOpen
                ? "./../../img/param.svg"
                : "../../img/Close.svg"
            }
            alt="filter"
          />
        )}

        <div className={styles.blockFormFirst}>
          <input
            placeholder="Фамилия"
            maxLength={50}
            defaultValue={store.formData.surname || ""}
            {...register("surname", { maxLength: 50 })}
          />
          <input
            placeholder="Имя"
            maxLength={50}
            defaultValue={store.formData.name || ""}
            {...register("name", { maxLength: 50 })}
          />
          <input
            placeholder="Отчество"
            defaultValue={store.formData.patronymic || ""}
            maxLength={50}
            {...register("patronymic", { maxLength: 20 })}
          />

          <input
            placeholder="Год рождения"
            maxLength={4}
            type="number"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              // Remove unwanted characters
              input.value = input.value.replace(/[-+eE]/g, "");
              // Limit input to 4 digits
              if (input.value.length > 4) {
                input.value = input.value.slice(0, 4);
              }
            }}
            defaultValue={props.data?.dateDeparture || ""}
            {...register("date", {
              required: false,
              maxLength: 4,
              pattern: /^[0-9]{4}$/,
            })}
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
            className={styles.bigInp}
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
        {!props.isFunction && (
          <button className={styles.reset} onClick={props.funReset}>
            Сбросить
          </button>
        )}
      </div>
    </form>
  );
}
