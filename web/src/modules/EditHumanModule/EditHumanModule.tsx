import {useState } from "react";
import styles from "./EditHumanModule.module.scss";
import CreateHuman from "../../components/CreateHuman/CreateHuman";
import { Link } from "react-router-dom";
function EditHumanModule() {

  return (
    <div className={styles.AdminPanelModule}>
        <div className={styles.search}>
        <Link to="/AdminPage/AdminSearchResult"> <img className={styles.ArrowBack} src="./../img/pageArrow.svg" alt="<"/> </Link> 
            <h1>Редактировать данные:</h1>
            <div>
                <CreateHuman/>
            </div>
        </div>
       
    </div>

  );
}

export default EditHumanModule;
