import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./AdminSearchResult.module.scss";
import Input from "../../ui/Input/Input";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { apiGetPeople } from "../../store/basic/people.slice";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import Form from "../../components/Form/Form";
import CardAdmin from "../../components/CardAdmin/CardAdmin";

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

  // const dispacth = useDispatch();
  // useEffect(() => {
  //   dispacth(apiGetPeople());
  // }, []);

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
          <Input
            type="text"
            placeholder={"Фамилия, Имя, Отчество, год рождения"}
            value={inpValue}
            funOnChange={(e: ChangeEvent<HTMLInputElement>) =>
              funOnChange(e.target.value)
            }
          />
        </div>
        {!isActionOpen && <button>НАЙТИ</button>}
      </div>
      {isActionOpen && (
        <div className={styles.filter}>
          <Form />
        </div>
      )}
      <div className={styles.container}>
        {store.people.map((item) => (
          <CardAdmin key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default AdminSearchResult;
