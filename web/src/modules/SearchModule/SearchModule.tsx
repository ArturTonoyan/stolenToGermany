import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./SearchModule.module.scss";
import Input from "../../ui/Input/Input";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  Person,
  resetFilterPeople,
  setFilterPeople,
  setSelectedPerson,
} from "../../store/basic/people.slice";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { resetForm } from "../../store/form/form.slice";

interface SearchModuleProps {}

const SearchModule: React.FC<SearchModuleProps> = () => {
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
    console.log(id);
    dispacth(setSelectedPerson({ id }));
    navigate("/SearchPage/HumanProfile");
  };

  //! при нажатии на кнопку найти
  const serchPeople = () => {
    const ostarbaiters = store.people.filter((person) =>
      Object.values(person).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(inpValue.toLowerCase())
      )
    );
    dispacth(setFilterPeople({ ostarbaiters }));
  };

  //! сброс данных
  const funReset = () => {
    //! сброс данных формы
    dispacth(resetForm());
    dispacth(resetFilterPeople());
  };

  return (
    <div className={styles.SearchModule}>
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
        {!isActionOpen && <button onClick={serchPeople}>НАЙТИ</button>}
        <button className={styles.reset} onClick={funReset}>
          Сбросить
        </button>
      </div>
      {isActionOpen && (
        <div className={styles.filter}>
          <Form />
        </div>
      )}
      <div className={styles.container}>
        {store.filterPeople?.map((item) => (
          <div key={item.id + "link"} onClick={() => clickCard(item?.id)}>
            <Card key={item.id} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchModule;
