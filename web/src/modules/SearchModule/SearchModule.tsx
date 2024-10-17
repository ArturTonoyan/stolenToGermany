import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./SearchModule.module.scss";
import Input from "../../ui/Input/Input";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetPeople,
  limCount,
  resetFilterPeople,
  resetLimit,
  resetPeople,
  setFilterPeople,
  setIsLoading,
  setLimitPlus,
  setSearchParam,
  setSelectedPerson,
} from "../../store/basic/people.slice";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { Inputs, resetForm, setFormData } from "../../store/form/form.slice";
import { apiOstarbaiters } from "../../api/ApiRequest";

const SearchModule = (props: any) => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const store = useSelector((state: RootState) => state.peopleSlice);
  const [inpValue, setInpValue] = useState<string>("");
  const isActionOpen = useSelector(
    (state: RootState) => state.actionSlice.action
  );

  //! при вводе данных в посик
  const funOnChange = (text: string): void => {
    console.log("text", text);
    setInpValue(text);
  };

  const clickCard = (id: string) => {
    dispacth(setSelectedPerson({ id }));
    navigate("/SearchPage/HumanProfile");
  };

  //! при нажатии на кнопку найти
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
    dispacth(resetLimit());
    funUpdatePeop(param, 1, limCount);
  };
  //! сброс данных
  const funReset = () => {
    //! сброс данных формы
    dispacth(resetForm());
    dispacth(resetPeople());
    props.funUpdatePeople(1, limCount);
    setInpValue("");
  };

  //! ДИНАМИЧЕСКАЯ ПОДГРУЗКА ДАННЫХ
  useEffect(() => {
    dispacth(resetPeople());
    props.funUpdatePeople(1, limCount);
    dispacth(setLimitPlus());
  }, []);

  const funUpdatePeop = (param: string, start: number, end: number) => {
    apiOstarbaiters({
      param: param,
      start: start,
      end: end,
    })
      .then((req) => {
        if (req?.status === 200) {
          dispacth(apiGetPeople({ ostarbaiters: req.data?.ostarbaiters }));
          // setIsLoading(false);
          dispacth(setIsLoading({ isLoading: false }));
          // setLimit([limit[1] + 1, limit[1] + limCount + 1]);
          dispacth(setLimitPlus());
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (store.isLoading) {
      funUpdatePeop(store.searchParam, store.limit[0], store.limit[1]);
    }
  }, [store.isLoading]);

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
      dispacth(setIsLoading({ isLoading: true }));
    }
  };

  return (
    <div className={styles.SearchModule}>
      <div className={styles.topMenu}>
        <div className={styles.search}>
          {!isActionOpen && (
            <Input
              type="text"
              placeholder={"Фамилия, год рождения"}
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
        {store.people?.map((item: any) => (
          <div key={item.id + "link"} onClick={() => clickCard(item?.id)}>
            <Card key={item.id} item={item} />
          </div>
        ))}
        {store.isLoading && <p>Загрузка данных...</p>}
        {store.people?.length === 0 && (
          <div className={styles.notFound}>
            Информации по введенным данным не найдено
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModule;
