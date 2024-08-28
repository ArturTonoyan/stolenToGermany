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
  if(store.selectedPerson != undefined){
    SetDataResp()
  }
 }, []);

const store = useSelector((state: RootState) => state.peopleSlice);
 const SetDataResp = () =>{
  apiGetOstarbaiter(store.selectedPerson).then((res) => {
    setData(res && res?.data?.ostarbaiter);  
  });
 }

 useEffect(() => {
  setDatas(data)
 },[data])

 const setDatas = (date: any) =>{
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
 }
  const location = useLocation();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
   
    props
      .funcCreate(data)
      .then((res: any) => {
        if(res[0]?.status === 200 && res[0].type === "edit") {
          reset(props.data);
          SetDataResp()
        }
        if (res[0]?.status === 200) {
          reset();
        
          setDataSaved(true);
        } else {
          setDataNotSaved(true);
        }
      });
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
              className={`${errors.surname ? styles.inputError : ''}`}
              maxLength={50}
              {...register("surname", { required: true, maxLength: 50 })}
            />
            <input
              placeholder="Имя"
              defaultValue={props.data?.name || ""}
              maxLength={50}
              {...register("name", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Отчество"
              defaultValue={props.data?.patronymic || ""}
              maxLength={50}
              {...register("patronymic", { required: false, maxLength: 20 })}
            />
            <input
              placeholder="Год рождения*"
              className={`${errors.date ? styles.inputError : ''}`}
              maxLength={50}
              defaultValue={props.data?.date || ""}
              {...register("date", { required: true, maxLength: 50 })}
            />
            <input
              placeholder="Адрес проживания до угона на принудительные работы в Германию"
              maxLength={50}
              defaultValue={props.data?.departure || ""}
              {...register("departure", { required: false, maxLength: 20 })}
            />
            <input
              placeholder="Профессия на момент отправки в Германию"
              maxLength={50}
              defaultValue={props.data?.profession || ""}
              {...register("profession", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Населенный пункт откуда угнан на принудительные работы"
              maxLength={50}
              defaultValue={props.data?.localityDeparture || ""}
              {...register("localityDeparture", {
                required: false,
                maxLength: 50,
              })}
            />
          </div>
          <div className={styles.blockFormSecond}>
            <input
              placeholder="Дата угона"
              maxLength={50}
              defaultValue={props.data?.dateDeparture || ""}
              {...register("dateDeparture", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Место трудоиспользования в Третьем рейхе"
              maxLength={50}
              defaultValue={props.data?.localityWork || ""}
              {...register("localityWork", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Дата, место и причина смерти на момент пребывания в Германии"
              maxLength={50}
              defaultValue={props.data?.infoOfDeath || ""}
              {...register("infoOfDeath", { required: false, maxLength: 50 })}
            />
            <input
              placeholder="Дата и место репатриации"
              maxLength={50}
              defaultValue={props.data?.infoOfRepatriation || ""}
              {...register("infoOfRepatriation", {
                required: false,
                maxLength: 50,
              })}
            />
            <input
              placeholder="Адрес проживания после возвращения в СССР"
              maxLength={50}
              defaultValue={props.data?.addressAfterReturning || ""}
              {...register("addressAfterReturning", {
                required: false,
                maxLength: 50,
              })}
            />
            {location.pathname === "/AdminPage/EditHumanModule" && (  
              <>
              <div className={styles.archive}>
                <div>
                  <Link to="/AdminPage/AdminPageEditArchiveModule"><p>Редактировать личный архив <img src="./../img/Files.svg"/></p></Link>
                </div>
              </div>
              </>
            )
           
            }
            
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
