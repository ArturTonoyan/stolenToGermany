import { useEffect, useState } from "react";
import styles from "./SearchModule.module.scss";
import Input from "../../ui/Input/Input";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetPeople,
  limCount,
  resetLimit,
  resetPeople,
  setCount,
  setIsLoading,
  setLimitPlus,
  setSearchParam,
  setSelectedPerson,
} from "../../store/basic/people.slice";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { Inputs, resetForm } from "../../store/form/form.slice";
import { apiOstarbaiters } from "../../api/ApiRequest";
import { openClodeAction } from "../../store/basic/action.slice";

const SearchModule = (props: any) => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  // const [count, setCount] = useState(50000);
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

  useEffect(() => {
    console.log("store.isLoading", store.isLoading);
  }, [store.isLoading]);
  //! при нажатии на кнопку найти
  const serchPeople = () => {
    // setCount(50000);
    dispacth(setCount({ count: 50000 }));
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
    props.funUpdatePeop(param, 1, limCount, 50000);
  };

  //! сброс для узкого поиска
  const funResetData = () => {
    setInpValue("");
    props.funUpdatePeop("", 1, limCount, 50000);
    dispacth(setSearchParam({ searchParam: "" }));
  };

  //! сброс широкого поиска
  const funResetDataBig = () => {
    dispacth(resetForm());
    dispacth(setSearchParam({ searchParam: "" }));
  };

  //! при клике на открытие заркрытие расширенного поска
  const funOpenBigSearch = () => {
    dispacth(resetForm());
    setInpValue("");
    dispacth(openClodeAction());
  };

  useEffect(() => {
    console.log("count", store.count);
  }, [store.count]);

  //! ДИНАМИЧЕСКАЯ ПОДГРУЗКА ДАННЫХ

  useEffect(() => {
    if (!store.searchParam) {
      dispacth(resetPeople());
      props.funUpdatePeop("", 1, limCount, 50000);
      dispacth(setLimitPlus());
      dispacth(setIsLoading({ isLoading: true }));
    }
  }, []);

  useEffect(() => {
    if (store.isLoading) {
      props.funUpdatePeop(
        store.searchParam,
        store.limit[0],
        store.limit[1],
        store.count
      );
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
              funOpenBigSearch={funOpenBigSearch}
            />
          )}
        </div>
        {!isActionOpen && <button onClick={serchPeople}>НАЙТИ</button>}
        {!isActionOpen && (
          <button className={styles.reset} onClick={funResetData}>
            Сбросить
          </button>
        )}
      </div>
      {isActionOpen && (
        <div className={styles.filter}>
          <Form
            isActionOpen={isActionOpen}
            funReset={funResetDataBig}
            funUpdatePeop={props.funUpdatePeop}
            funOpenBigSearch={funOpenBigSearch}
          />
        </div>
      )}
      <div className={styles.container}>
        {store.people?.map((item: any) => (
          <div key={item.id + "link"} onClick={() => clickCard(item?.id)}>
            <Card key={item.id} item={item} />
          </div>
        ))}
        {store.people?.length === 0 && !store.isLoading && (
          <div className={styles.notFound}>
            Информации по введенным данным не найдено
          </div>
        )}
      </div>
      <div className={styles.loaderMain}>
        {store.isLoading && <span className={styles.loader}></span>}
      </div>
    </div>
  );
};

export default SearchModule;
