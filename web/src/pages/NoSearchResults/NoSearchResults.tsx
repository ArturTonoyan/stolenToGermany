import React from "react";
import styles from "./NoSearchResults.module.scss";
import { Link } from "react-router-dom";

function NoSearchResults() {
  return (
    <div className={styles.NoSearchResults}>
      <div className={styles.NoSearchResults__inner}>
        <div className={styles.NoSearchResults__flex}>
            <p>Информации по введенным данным не найдено</p>
            <Link to="/SearchPage/SearchModule"><button>ВЕРНУТЬСЯ К ПОИСКУ</button></Link>
        </div>
      </div>
    </div>
  );
}

export default NoSearchResults;
