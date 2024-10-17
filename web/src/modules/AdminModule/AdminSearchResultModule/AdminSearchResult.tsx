import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./AdminSearchResult.module.scss";
import Input from "../../../ui/Input/Input";
import Card from "../../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetPeople,
  limCount,
  Person,
  resetFilterPeople,
  resetLimit,
  resetPeople,
  setSearchParam,
} from "../../../store/basic/people.slice";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import Form from "../../../components/Form/Form";
import CardAdmin from "../../../components/CardAdmin/CardAdmin";
import { Inputs, resetForm } from "../../../store/form/form.slice";
import { apiOstarbaiters } from "../../../api/ApiRequest";

const AdminSearchResult = (props: any) => {
  const store = useSelector((state: RootState) => state.peopleSlice);
  const [limit, setLimit] = useState([1, limCount]);
  const [isLoading, setIsLoading] = useState(false);
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

  const dispacth = useDispatch();

  //! при нажатии на кнопку найти
  //! при нажатии на кнопку найти
  function funUpdatePeop(param: string, start: number, end: number) {
    apiOstarbaiters({
      param: param,
      start: start,
      end: end,
    })
      .then((req) => {
        if (req?.status === 200) {
          dispacth(apiGetPeople({ ostarbaiters: req.data?.ostarbaiters }));
          setIsLoading(false);
          setLimit([limit[1] + 1, limit[1] + limCount + 1]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const serchPeople = () => {
    const mass = inpValue.replaceAll(",", " ").split(" ");
    let sur = "";
    let dat = "";

    mass.map((el) => {
      if (el) {
        if (Number(el)) {
          dat = el;
        } else if (el !== " ") {
          sur = el;
        }
      }
    });

    const data: Inputs = {
      surname: sur || "",
      name: "",
      patronymic: "",
      date: dat || "",
      localityWork: "",
      departure: "",
      profession: "",
      localityDeparture: "",
      dateDeparture: "",
    };
    let param = "";
    Object.keys(data).forEach((key) => {
      param += `${key}=${data[key as keyof Inputs]}&`;
    });
    dispacth(setSearchParam({ searchParam: param }));
    setLimit([1, limCount]);
    funUpdatePeop(param, 1, limCount);
  };

  //! сброс данных
  const funReset = () => {
    //! сброс данных формы
    dispacth(setSearchParam({ searchParam: "" }));
    dispacth(resetForm());
    dispacth(resetPeople());
    funUpdatePeop("", 1, limCount);
    setLimit([1, limCount]);
    setInpValue("");
  };

  //! ДИНАМИЧЕСКАЯ ПОДГРУЗКА ДАННЫХ

  useEffect(() => {
    dispacth(setSearchParam({ searchParam: "" }));
  }, [isActionOpen]);

  useEffect(() => {
    dispacth(resetPeople());
    props.funUpdatePeople(limit[0], limit[1]);
    setLimit([limit[1] + 1, limit[1] + limCount + 1]);
  }, []);

  useEffect(() => {
    if (isLoading) {
      funUpdatePeop(store.searchParam, limit[0], limit[1]);
    }
  }, [isLoading]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return function () {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        200 -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      console.log("scroll");
      setIsLoading(true);
    }
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
              funOnChange={funOnChange}
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
          <Form
            isActionOpen={isActionOpen}
            funReset={funReset}
            funUpdatePeop={funUpdatePeop}
          />
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
