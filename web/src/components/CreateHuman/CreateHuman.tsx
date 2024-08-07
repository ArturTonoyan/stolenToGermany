import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./CreateHuman.module.scss"
type Inputs = {
  firstName: string
  lastName: string
  patronumic: string
  burthDate: string
  adress: string
  dateygon: string
  aressygon: string
  locateWork: string
}


export default function CreateHuman() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div>
        <h1>Внести новые данные о человеке:</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* {errors.lastName && errors.lastName.type === "maxLength" && (
            <span>Фамилия должна содержать не более 50 символов</span>
        )}
        {errors.lastName && errors.lastName.type === "required" && (
        <span>Поле обязательно к заполнению</span>
        )} */}
        <div className={styles.blockInput}>
            <div className={styles.blockFormFirst}>
            <input placeholder="Фамилия" maxLength={50} {...register("lastName", { required: true, maxLength: 50 })} />
            <input placeholder="Отчество" maxLength={50} {...register("patronumic", { required: true, maxLength: 20 })} />
            <input placeholder="Имя" maxLength={50} {...register("firstName", { required: true, maxLength: 50 })} />
            <input placeholder="Год рождения" maxLength={50} {...register("burthDate", { required: true, maxLength: 50 })} />
            </div>
            <div className={styles.blockFormSecond}>
            <input placeholder="Адрес проживания до угона в Германию" maxLength={50} {...register("adress", { required: true, maxLength: 50 })} />
            <input placeholder="Дата угона на принудительные работы в Германию" maxLength={50} {...register("dateygon", { required: true, maxLength: 20 })} />
            <input placeholder="Населенный пункт откуда угнан на принудительные работы" maxLength={50} {...register("aressygon", { required: true, maxLength: 50 })} />
            <input placeholder="Место трудоиспользования в Третьем рейхе" maxLength={50} {...register("locateWork", { required: true, maxLength: 50 })} />
            </div>
        </div>
        <div className={styles.SubmitButton}>
            <input type="submit" value="Найти"/>
        </div>
        
        </form>
    </div>
  )
}
