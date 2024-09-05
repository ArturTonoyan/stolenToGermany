import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./AdminSearchResult.module.scss";
import Input from "../../../ui/Input/Input";
import Card from "../../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  Person,
  apiGetPeople,
  resetFilterPeople,
} from "../../../store/basic/people.slice";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import Form from "../../../components/Form/Form";
import CardAdmin from "../../../components/CardAdmin/CardAdmin";
import { apiOstarbaiters } from "../../../api/ApiRequest";
import { resetForm } from "../../../store/form/form.slice";

interface SearchModuleProps {}

const AdminSearchResult: React.FC<SearchModuleProps> = () => {
  const store = useSelector((state: RootState) => state.peopleSlice);
  const isActionOpen = useSelector(
    (state: RootState) => state.actionSlice.action
  );
  const [inpValue, setInpValue] = useState<string>("");
  const funOnChange = (text: string): void => {
    setInpValue(text);
  };
  const [filterHumen, setFilterHumen] = useState<Person[]>([]);

  useEffect(() => {
    setFilterHumen(store.people);
  }, [store.people]);
  useEffect(() => {
    console.log("filterHumen", filterHumen);
  }, [filterHumen]);

  const dispacth = useDispatch();

  useEffect(() => {
    apiOstarbaiters().then((req) => {
      if (req?.status === 200) {
        dispacth(apiGetPeople({ ostarbaiters: req.data?.ostarbaiters }));
        console.log("req.data", req.data.ostarbaiters);
      }
    });
  }, []);

  //! при нажатии на кнопку найти
  const serchPeople = () => {
    const ostarbaiters = store.people.filter((person: any) =>
      Object.keys(person)
        .filter((key) => key !== "id" && key !== "img")
        .some(
          (key) =>
            person[key] !== null &&
            person[key] !== undefined &&
            person[key]
              .toString()
              .toLowerCase()
              .includes(inpValue.trim().toLowerCase())
        )
    );
    setFilterHumen(ostarbaiters);
  };
  // const dispacth = useDispatch();
  // useEffect(() => {
  //   dispacth(apiGetPeople());
  // }, []);
  const funReset = () => {
    //! сброс данных формы
    dispacth(resetForm());
    dispacth(resetFilterPeople());
    setInpValue("");
    setFilterHumen(store.people);
  };

  return (
    <div className={styles.SearchModule}>
      <Link to="/AdminPage/AdminPanelModule">
        {" "}
        <img
          className={styles.ArrowBack}
          src="./../img/pageArrow.svg"
          alt="<"
        />{" "}
      </Link>
      <h1>Поиск для редактирования существующей информации:</h1>
      <div className={styles.topMenu}>
        <div className={styles.search}>
          {!isActionOpen && (
            <Input
              type="text"
              placeholder={"Фамилия, Имя, Отчество, год рождения"}
              value={inpValue}
              funOnChange={(e: ChangeEvent<HTMLInputElement>) =>
                funOnChange(e.target.value)
              }
            />
          )}
        </div>
        {!isActionOpen && <button onClick={serchPeople}>НАЙТИ</button>}
        {!isActionOpen && (
          <button className={styles.reset} onClick={funReset}>
            Сбросить
          </button>
        )}
      </div>
      {isActionOpen && (
        <div className={styles.filter}>
          <Form isActionOpen={isActionOpen} funReset={funReset} />
        </div>
      )}
      <div className={styles.container}>
        {filterHumen.map((item) => (
          <CardAdmin key={item.id} item={item} serchPeople={serchPeople} />
        ))}
        {filterHumen?.length === 0 && (
          <div className={styles.notFound}>
            Информации по введенным данным не найдено
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSearchResult;
