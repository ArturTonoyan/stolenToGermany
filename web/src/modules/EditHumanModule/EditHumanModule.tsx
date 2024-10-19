import { useEffect, useState } from "react";
import styles from "./EditHumanModule.module.scss";
import CreateHuman from "../../components/CreateHuman/CreateHuman";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Person } from "../../store/basic/people.slice";
import { OstarbaitersEdit, apiGetOstarbaiter } from "../../api/ApiRequest";
function EditHumanModule(props: any) {
  const store = useSelector((state: RootState) => state.peopleSlice);
  const [peopleData, SetPeopleData] = useState<Person>({} as Person);
  useEffect(() => {
    apiGetOstarbaiter(store.selectedPerson).then((response: any) => {
      const data = response?.data?.ostarbaiter;
      SetPeopleData(data);
    });
  }, []);

  const editHuman = async (data: Person) => {
    const response = await OstarbaitersEdit(data, peopleData.id);

    const resp = {
      type: "edit",
      status: response?.status,
    };

    if (resp) {
      return resp;
    }
  };

  return (
    <div className={styles.AdminPanelModule}>
      <div className={styles.search}>
        <Link to="/AdminPage/AdminSearchResult">
          {" "}
          <img
            className={styles.ArrowBack}
            src="./../img/pageArrow.svg"
            alt="<"
          />{" "}
        </Link>
        <h1>Редактировать данные:</h1>
        <div>
          <CreateHuman
            data={peopleData}
            funcCreate={editHuman}
            setAutorization={props.setAutorization}
          />
        </div>
      </div>
    </div>
  );
}

export default EditHumanModule;
