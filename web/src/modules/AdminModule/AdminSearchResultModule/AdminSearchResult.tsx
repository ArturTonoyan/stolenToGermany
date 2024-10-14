import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./AdminSearchResult.module.scss";
import Input from "../../../ui/Input/Input";
import Card from "../../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  Person,
  resetFilterPeople,
  resetLimit,
} from "../../../store/basic/people.slice";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import Form from "../../../components/Form/Form";
import CardAdmin from "../../../components/CardAdmin/CardAdmin";
import { resetForm } from "../../../store/form/form.slice";

const AdminSearchResult = (props: any) => {
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
    setFilterHumen(store.filterPeople);
  }, [store.filterPeople]);

  useEffect(() => {
    console.log("filterHumen", filterHumen);
  }, [filterHumen]);

  const dispacth = useDispatch();

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

  //! ДИНАМИЧЕСКАЯ ПОДГРУЗКА ДАННЫХ
  const [scrollY, setScrollY] = useState(0); //! положение скролла на странице
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispacth(resetLimit());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      //! Определяем, достиг ли скролл конца страницы
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      // console.log("scrollHeight", scrollHeight, "clientHeight", clientHeight);
      const scrollPosition = (scrollHeight - clientHeight) / 1.5;
      if (scrollY >= scrollPosition && !isLoading) {
        //! Подгружаем дополнительные данные
        handleLoadMoreData();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  useEffect(() => {
    props.funUpdatePeople();
  }, []);

  const handleLoadMoreData = () => {
    setIsLoading(true);
    props.funUpdatePeople();
    // dispacth(setLimitPlus());
    setIsLoading(false);
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
              funReset={funReset}
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
        {store.people.map((item) => (
          <CardAdmin key={item.id} item={item} serchPeople={serchPeople} />
        ))}
        {store.people?.length === 0 && (
          <div className={styles.notFound}>
            Информации по введенным данным не найдено
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSearchResult;
