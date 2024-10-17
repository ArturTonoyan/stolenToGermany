import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./SearchModule.module.scss";
import Input from "../../ui/Input/Input";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetPeople,
  limCount,
  resetLimit,
  resetPeople,
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
  const [count, setCount] = useState(50000);
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
    setCount(50000);
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
    funUpdatePeop(param, 1, limCount, 50000);
  };
  //! сброс данных
  const funReset = () => {
    console.log("a", count);
    setCount(50000);
    //! сброс данных формы
    dispacth(resetForm());
    dispacth(resetPeople());
    // props.funUpdatePeople(1, limCount);
    dispacth(setSearchParam({ searchParam: "" }));
    dispacth(setLimitPlus());
    setInpValue("");
  };

  const funReset2 = () => {
    console.log("a", count);
    setCount(50000);
    //! сброс данных формы
    dispacth(resetPeople());
    props.funUpdatePeople(1, limCount);
    dispacth(setLimitPlus());

    setInpValue("");
  };

  //! ДИНАМИЧЕСКАЯ ПОДГРУЗКА ДАННЫХ
  useEffect(() => {
    dispacth(resetPeople());
    props.funUpdatePeople(1, limCount);
    dispacth(setLimitPlus());
  }, []);

  const funUpdatePeop = (
    param: string,
    start: number,
    end: number,
    count: number
  ) => {
    console.log("count, start", count, start);
    if (start < count) {
      props.setIsLoad(true);
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
            setCount(req.data?.count);
          }
        })
        .finally(() => {
          setIsLoading(false);
          props.setIsLoad(false);
        });
    } else {
      setIsLoading(false);
      props.setIsLoad(false);
    }
  };

  useEffect(() => {
    if (store.isLoading) {
      funUpdatePeop(store.searchParam, store.limit[0], store.limit[1], count);
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
              funReset={funReset2}
            />
          )}
        </div>
        {!isActionOpen && <button onClick={serchPeople}>НАЙТИ</button>}
        {!isActionOpen && (
          <button className={styles.reset} onClick={funReset2}>
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
            setCount={setCount}
            funReset2={funReset2}
          />
        </div>
      )}
      <div className={styles.container}>
        {store.people?.map((item: any) => (
          <div key={item.id + "link"} onClick={() => clickCard(item?.id)}>
            <Card key={item.id} item={item} />
          </div>
        ))}
        {store.people?.length === 0 && !props.isLoad && (
          <div className={styles.notFound}>
            Информации по введенным данным не найдено
          </div>
        )}
      </div>
      <div className={styles.loaderMain}>
        {props.isLoad && <span className={styles.loader}></span>}
      </div>
    </div>
  );
};

export default SearchModule;
