import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./CreateHuman.module.scss";
import { OstarbaitersCreate, apiGetOstarbaiter } from "../../api/ApiRequest";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type Inputs = {
  name: string;
  surname: string;
  patronymic: string;
  date: string;
  dateDeparture: string;
  profession: string;
  localityWork: string;
  localityDeparture: string;
  departure: string;
  infoOfRepatriation: string;
  addressAfterReturning: string;
  infoOfDeath: string;
};

export default function CreateHuman(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    
  } = useForm<Inputs>();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (
      store.selectedPerson != undefined &&
      location.pathname !== "/AdminPage/AdminPanelModule"
    ) {
      SetDataResp();
    }
  }, []);

  const store = useSelector((state: RootState) => state.peopleSlice);
  const SetDataResp = () => {
    apiGetOstarbaiter(store.selectedPerson).then((res) => {
      setData(res && res?.data?.ostarbaiter);
    });
  };

  useEffect(() => {
    setDatas(data);
  }, [data]);

  const setDatas = (date: any) => {
    setValue("surname", date?.surname || "");
    setValue("name", date?.name || "");
    setValue("patronymic", date?.patronymic || "");
    setValue("date", date?.date || "");
    setValue("departure", date?.departure || "");
    setValue("profession", date?.profession || "");
    setValue("localityDeparture", date?.localityDeparture || "");
    setValue("dateDeparture", date?.dateDeparture || "");
    setValue("localityWork", date?.localityWork || "");
    setValue("infoOfDeath", date?.infoOfDeath || "");
    setValue("infoOfRepatriation", date?.infoOfRepatriation || "");
    setValue("addressAfterReturning", date?.addressAfterReturning || "");
  };
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string[]>([])
  function isValid(value: string, key:string) {
    // Проверяем, что строка не содержит цифр и английских букв
    const regex = /^[А-Яа-яЁё\s]+$/;
    const regex2 = /^[А-Яа-яЁё0-9\s/_-]+$/;
    if(key === "name" || key === "surname" || key === "patronymic"){
      return regex.test(value);
    }else if(key !== "date" && key !== "dateDeparture"){
      return regex2.test(value);
    }else{
      const date = Number(value);
      console.log("date", date)
     if(date < 1900 || date > 2022){
      return false
     }else{
      return true
     }
    }
}

useEffect(() => {
  console.log("errorMessage", errorMessage)
}, [errorMessage])
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data)
    for (const key of Object.keys(data) as (keyof Inputs)[]) {
      if(data[key] !== ""){
        if (!isValid(data[key], key)) {
          console.log(`${key} содержит недопустимые символы.`);
          setErrorMessage(prev => [...prev, key])
        }else{
          setErrorMessage(prev => prev.filter((item) => item !== key))
        }
      }
    }

    // if(errorMessage.length === 0){
    //   props.funcCreate(data).then((res: any) => {
    //   if (res?.status === 200 && res.type === "edit") {
    //     reset(props.data);
    //     SetDataResp();
    //   }
    //   if (res?.status === 200) {
    //     reset();

    //     setDataSaved(true);
    //   } else {
    //     console.log("res", res);
    //     setDataNotSaved(true);
    //   }
    // });
    // } 
  };
  const [DataSaved, setDataSaved] = useState<boolean>(false);
  const [DataNotSaved, setDataNotSaved] = useState<boolean>(false);

  return (
    <div className={styles.CreateHuman}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.blockInput}>
          <div className={styles.blockFormFirst}>
            <input
              placeholder="Фамилия*"
              defaultValue={props.data?.surname || ""}
              className={`${errors.surname ? styles.inputError : ""}`}
              maxLength={50}
              {...register("surname", { required: true, maxLength: 50})}
            />
            {errorMessage.includes("surname") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}
            <input
              placeholder="Имя"
              defaultValue={props.data?.name || ""}
              maxLength={50}
              {...register("name", { required: false, maxLength: 50 })}
            />
            {errorMessage.includes("name") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}

            <input
              placeholder="Отчество"
              defaultValue={props.data?.patronymic || ""}
              maxLength={50}
              {...register("patronymic", { required: false, maxLength: 20 })}
            />
            {errorMessage.includes("patronymic") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}
           <input
            placeholder="Год рождения*"
            className={`${errors.date ? styles.inputError : ""}`}
            type="number"
            defaultValue={props.data?.date || ""}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (input.value.length > 4) {
                input.value = input.value.slice(0, 4);
              }
            }}
            {...register("date", { 
              required: true, 
              pattern: /^[0-9]{4}$/ // Ensures only 4 digits are allowed
            })}
          />
          {errorMessage.includes("date") && <p className={styles.errorMessage}>Год должен быть больше 1900 и меньше 2022</p>}

            <input
              className={styles.biginp}
              placeholder="Адрес проживания до угона на принудительные работы в Германию"
              maxLength={50}
              defaultValue={props.data?.departure || ""}
              {...register("departure", { required: false, maxLength: 20 })}
            />
            {errorMessage.includes("departure") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}
            <input
              placeholder="Профессия на момент отправки в Германию"
              maxLength={50}
              defaultValue={props.data?.profession || ""}
              {...register("profession", { required: false, maxLength: 50 })}
            />
            {errorMessage.includes("profession") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}
            <input
              placeholder="Населенный пункт откуда угнан на принудительные работы"
              maxLength={50}
              defaultValue={props.data?.localityDeparture || ""}
              {...register("localityDeparture", {
                required: false,
                maxLength: 50,
              })}
            />
            {errorMessage.includes("localityDeparture") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}
          </div>
          <div className={styles.blockFormSecond}>
            <input
              placeholder="Дата угона"
              maxLength={4}
              type="number"
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                if (input.value.length > 4) {
                  input.value = input.value.slice(0, 4);
                }
              }}
              defaultValue={props.data?.dateDeparture || ""}
              {...register("dateDeparture", {  required: false, 
                maxLength: 4, 
                pattern: /^[0-9]{4}$/})}
            />
            {errorMessage.includes("dateDeparture") && <p className={styles.errorMessage}>Год должен быть больше 1900 и меньше 2022</p>}
            <input
              placeholder="Место трудоиспользования в Третьем рейхе"
              maxLength={50}
              defaultValue={props.data?.localityWork || ""}
              {...register("localityWork", { required: false, maxLength: 50 })}
            />
            {errorMessage.includes("localityWork") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}
            <input
              placeholder="Дата, место и причина смерти на момент пребывания в Германии"
              maxLength={50}
              defaultValue={props.data?.infoOfDeath || ""}
              {...register("infoOfDeath", { required: false, maxLength: 50 })}
            />
            {errorMessage.includes("infoOfDeath") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}
            <input
              placeholder="Дата и место репатриации"
              maxLength={50}
              defaultValue={props.data?.infoOfRepatriation || ""}
              {...register("infoOfRepatriation", {
                required: false,
                maxLength: 50,
              })}
            />
            {errorMessage.includes("infoOfRepatriation") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}
            <input
              placeholder="Адрес проживания после возвращения в СССР"
              maxLength={50}
              defaultValue={props.data?.addressAfterReturning || ""}
              {...register("addressAfterReturning", {
                required: false,
                maxLength: 50,
              })}
            />
            {errorMessage.includes("addressAfterReturning") && <p className={styles.errorMessage}>Поле содержит недопустимые символы.</p>}
            {location.pathname === "/AdminPage/EditHumanModule" && (
              <>
                <div className={styles.archive}>
                  <div>
                    <Link to="/AdminPage/AdminPageEditArchiveModule">
                      <p>
                        Редактировать личный архив{" "}
                        <img src="./../img/Files.svg" />
                      </p>
                    </Link>
                  </div>
                </div>
              </>
            )}

            <div className={styles.SubmitButton}>
              <input type="submit" value="Сохранить" />
            </div>
            {location.pathname !== "/AdminPage/EditHumanModule" && (
              <>
                <div className={styles.Button}>
                  <Link to="/AdminPage/AdminSearchResult">
                    <button>Редактирование существующей информации</button>
                  </Link>
                </div>
              </>
            )}
            {DataSaved && (
              <div className={styles.DataSave}>
                <p>Данные успешно сохранены*</p>
                <img
                  onClick={() => setDataSaved(false)}
                  src="./../../img/CloseArrowGreen.svg"
                />
              </div>
            )}
            {DataNotSaved && (
              <div className={styles.DataNotSave}>
                <p>Данные не сохранены, проверьте заполненные поля*</p>
                <img
                  onClick={() => setDataNotSaved(false)}
                  src="./../../img/CloseArrowRed.svg"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
