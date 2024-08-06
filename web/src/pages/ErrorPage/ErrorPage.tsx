import React from "react";
import styles from "./ErrorPage.module.scss";

function ErrorPage() {
  return (
    <div className={styles.ErrorPage}>
      <div className={styles.ErrorPage__inner}>
       
            <p>
                Страница не найдена
            </p>
      
            <p>
                404
            </p>
       
      </div>
    </div>
  );
}

export default ErrorPage;
