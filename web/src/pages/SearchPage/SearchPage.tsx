import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./SearchPage.module.scss";
import Input from "../../ui/Input/Input";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { apiGetPeople } from "../../store/basic/people.slice";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  const store = useSelector((state: RootState) => state.peopleSlice);

  const [inpValue, setInpValue] = useState<string>("");

  const funOnChange = (text: string): void => {
    setInpValue(text);
  };

  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(apiGetPeople());
  }, []);

  return (
    <div className={styles.SearchPage}>
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
        <button>НАЙТИ</button>
      </div>
      <div className={styles.container}>
        {store.people.map((item) => (
          <Link to="./../HumanProfilePage">
            <Card key={item.id} item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
