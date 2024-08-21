import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./SearchModule.module.scss";
import Input from "../../ui/Input/Input";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { Person, setSelectedPerson } from "../../store/basic/people.slice";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";

interface SearchModuleProps {}

const SearchModule: React.FC<SearchModuleProps> = () => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const store = useSelector((state: RootState) => state.peopleSlice);
  const [inpValue, setInpValue] = useState<string>("");
  const [filterHumen, setFilterHumen] = useState<Person[]>([]);
  const isActionOpen = useSelector(
    (state: RootState) => state.actionSlice.action
  );

  useEffect(() => {
    setFilterHumen(store.people);
  }, [store.people]);

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
    setFilterHumen(
      store.people.filter((person) =>
        Object.values(person).some(
          (value) =>
            value !== null &&
            value !== undefined &&
            value.toString().toLowerCase().includes(inpValue.toLowerCase())
        )
      )
    );
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
      </div>
      {isActionOpen && (
        <div className={styles.filter}>
          <Form />
        </div>
      )}
      <div className={styles.container}>
        {filterHumen?.map((item) => (
          <div key={item.id + "link"} onClick={() => clickCard(item?.id)}>
            <Card key={item.id} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchModule;
