import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./SearchModule.module.scss";
import Input from "../../ui/Input/Input";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPerson } from "../../store/basic/people.slice";
import { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { openClodeAction } from "../../store/basic/action.slice";

interface SearchModuleProps {}

const SearchModule: React.FC<SearchModuleProps> = () => {
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => state.peopleSlice);
  const isActionOpen = useSelector(
    (state: RootState) => state.actionSlice.action
  );

  const dispacth = useDispatch();

  const [inpValue, setInpValue] = useState<string>("");

  const funOnChange = (text: string): void => {
    setInpValue(text);
  };

  const clickCard = (id: string) => {
    console.log(id);
    dispacth(setSelectedPerson({ id }));
    navigate("/SearchPage/HumanProfile");
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
        {!isActionOpen && <button>НАЙТИ</button>}
      </div>
      {isActionOpen && (
        <div className={styles.filter}>
          <Form />
        </div>
      )}
      <div className={styles.container}>
        {store.people?.map((item) => (
          // <Link key={item.id + "link"} to="/SearchPage/HumanProfile">
          <div key={item.id + "link"} onClick={() => clickCard(item?.id)}>
            <Card key={item.id} item={item} />
          </div>
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchModule;
