import { useState } from "react";
import styles from "./AdminPanelModule.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CreateHuman from "../../../components/CreateHuman/CreateHuman";
import { Person } from "../../../store/basic/people.slice";
import { OstarbaitersCreate } from "../../../api/ApiRequest";
function AdminPanelModule() {
  const createdHuman = async (data: Person) => {
    try {
      const response = await OstarbaitersCreate(data);
      if (response?.status === 200) {
        return { status: 200 };
      }
      return { status: 400 };
    } catch (error) {
      console.error("Ошибка в функции createdHuman:", error);
      return { status: 400 };
    }
  };

  return (
    <div className={styles.AdminPanelModule}>
      <div className={styles.search}>
        <div>
          <h1 className={styles.title}>Внести новые данные о человеке:</h1>
          <CreateHuman funcCreate={createdHuman} />
        </div>
      </div>
    </div>
  );
}

export default AdminPanelModule;
