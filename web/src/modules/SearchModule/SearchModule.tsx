import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./SearchModule.module.scss";
import Input from "../../ui/Input/Input";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetPeople,
  resetFilterPeople,
  resetPeople,
  setFilterPeople,
  setSelectedPerson,
} from "../../store/basic/people.slice";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { resetForm } from "../../store/form/form.slice";
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
    setInpValue(text);
  };

  const clickCard = (id: string) => {
    dispacth(setSelectedPerson({ id }));
    navigate("/SearchPage/HumanProfile");
  };

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
    dispacth(setFilterPeople({ ostarbaiters }));
  };
  //! сброс данных
  const funReset = () => {
    //! сброс данных формы
    dispacth(resetForm());
    dispacth(resetFilterPeople());
    setInpValue("");
  };

  //! ДИНАМИЧЕСКАЯ ПОДГРУЗКА ДАННЫХ
  // const cardHeight = 470;
  const cardWidth = 318;
  const limCount = Math.floor((window.innerWidth - 98) / cardWidth) * 10;
  const [limit, setLimit] = useState([0, limCount]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispacth(resetPeople());
    props.funUpdatePeople(limit[0], limit[1]);
    setLimit([limit[1] + 1, limit[1] + limCount + 1]);
  }, []);

  useEffect(() => {
    if (isLoading) {
      apiOstarbaiters({
        start: limit[0],
        end: limit[1],
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
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      console.log("scroll");
      setIsLoading(true);
    }
  };

  return (
    <div className={styles.SearchModule}>
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
        {store.people?.map((item: any, index) => (
          <div key={item.id + "link"} onClick={() => clickCard(item?.id)}>
            <Card key={item.id} item={item} />
          </div>
        ))}
        {isLoading && <p>Загрузка данных...</p>}
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
