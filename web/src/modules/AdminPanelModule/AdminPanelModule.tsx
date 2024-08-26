import { ChangeEvent, useEffect, useState } from "react";
import Input from "../../ui/Input/Input";
import styles from "./AdminPanelModule.module.scss";
import Form from "../../components/Form/Form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CreateHuman from "../../components/CreateHuman/CreateHuman";
import { Person } from "../../store/basic/people.slice";
import { AddPhotoImg, OstarbaitersCreate } from "../../api/ApiRequest";
import { create } from "domain";
import { Link } from "react-router-dom";
function AdminPanelModule() {
  const [inpValue, setInpValue] = useState<string>("");

  const funOnChange = (text: string): void => {
    setInpValue(text);
  };
  const store = useSelector((state: RootState) => state.peopleSlice);
  const isActionOpen = useSelector(
    (state: RootState) => state.actionSlice.action
  );
  //     const [filterHumen, setFilterHumen] = useState<Person[]>([]);

  //     useEffect(() => {
  //       setFilterHumen(store.people);
  //     }, [store.people]);

  //      //! при нажатии на кнопку найти
  //   const serchPeople = () => {
  //     setFilterHumen(
  //       store.people.filter((person) =>
  //         Object.values(person).some(
  //           (value) =>
  //             value !== null &&
  //             value !== undefined &&
  //             value.toString().toLowerCase().includes(inpValue.toLowerCase())
  //         )
  //       )
  //     );
  //   };
  const createdHuman = async (
    data: Person,
    photo: File,
    additionalFiles: File[]
  ) => {
    try {
      const response = await OstarbaitersCreate(data);
      if (response?.status === 200) {
        const resp = await AddPhotoImg(photo);
        return [
          {
            type: "create",
            status: resp?.status,
          },
        ];
      }
      return [];
    } catch (error) {
      console.error("Error in createdHuman function:", error);
      return [];
    }
  };

  return (
    <div className={styles.AdminPanelModule}>
      <div className={styles.search}>
        <div>
          <h1 className={styles.title}>Внести новые данные о человеке:</h1>
          <CreateHuman funcCreate={createdHuman} />
          <div className={styles.Button}>
            <Link to="/AdminPage/AdminSearchResult">
              <button>Редактирование существующей информации</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanelModule;
