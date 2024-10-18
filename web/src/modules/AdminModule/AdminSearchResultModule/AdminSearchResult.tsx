import { useEffect, useState } from "react";
import styles from "./AdminSearchResult.module.scss";
import Input from "../../../ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  limCount,
  resetLimit,
  resetPeople,
  setIsLoading,
  setLimitPlus,
  setSearchParamAdmin,
} from "../../../store/basic/people.slice";
import { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import Form from "../../../components/Form/Form";
import CardAdmin from "../../../components/CardAdmin/CardAdmin";
import { Inputs, resetForm } from "../../../store/form/form.slice";
import { openClodeAction } from "../../../store/basic/action.slice";

const AdminSearchResult = (props: any) => {
  const dispacth = useDispatch();
  const store = useSelector((state: RootState) => state.peopleSlice);
  const [inpValue, setInpValue] = useState<string>("");
  // const [limit, setLimit] = useState([1, limCount]);
  // const [isLoading, setIsLoading] = useState(false);
  const isActionOpen = useSelector(
    (state: RootState) => state.actionSlice.action
  );
  const funOnChange = (text: string): void => {
    setInpValue(text);
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
    dispacth(setSearchParamAdmin({ searchParamAdmin: param }));
    dispacth(resetLimit());
    props.funUpdatePeop(param, 1, limCount, 50000);
    // setCount(50000);
  };

  //! сброс для узкого поиска
  const funResetData = () => {
    setInpValue("");
    props.funUpdatePeop("", 1, limCount, 50000);
    dispacth(setSearchParamAdmin({ searchParamAdmin: "" }));
  };

  //! сброс широкого поиска
  const funResetDataBig = () => {
    dispacth(resetForm());
    dispacth(setSearchParamAdmin({ searchParamAdmin: "" }));
  };

  //! при клике на открытие заркрытие расширенного поска
  const funOpenBigSearch = () => {
    dispacth(resetForm());
    setInpValue("");
    dispacth(openClodeAction());
  };

  // //! сброс данных
  // const funReset = () => {
  //   //! сброс данных формы
  //   dispacth(setSearchParamAdmin({ searchParamAdmin: "" }));
  //   dispacth(resetForm());
  //   dispacth(resetPeople());
  //   funUpdatePeop("", 1, limCount, 50000);
  //   setLimit([1, limCount]);
  //   setInpValue("");
  // };

  //! ДИНАМИЧЕСКАЯ ПОДГРУЗКА ДАННЫХ

  // useEffect(() => {
  //   dispacth(setSearchParamAdmin({ searchParamAdmin: "" }));
  // }, [isActionOpen]);

  useEffect(() => {
    dispacth(resetForm());
    setInpValue("");
    dispacth(resetPeople());
    props.funUpdatePeop("", 1, limCount, 50000);
    dispacth(setLimitPlus());
    dispacth(setIsLoading({ isLoading: true }));
  }, []);

  useEffect(() => {
    if (store.isLoading) {
      props.funUpdatePeop(
        store.searchParamAdmin,
        store.limit[0],
        store.limit[1],
        store.count
      );
    }
  }, [store.isLoading]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    console.log("scroll");
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
      dispacth(setIsLoading({ isLoading: true }));
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
            isAdmin={true}
          />
        </div>
      )}
      <div className={styles.container}>
        {store.people.map((item) => (
          <CardAdmin key={item.id} item={item} serchPeople={serchPeople} />
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

export default AdminSearchResult;
