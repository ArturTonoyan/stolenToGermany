import { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import config from "./../../config.json";

function Card(props: any) {
  const server = config.REACT_APP_API_URL;
  //! преобразуем фио для вывода
  const fio = [props.item?.surname, props.item?.name, props.item?.patronymic]
    .filter(Boolean)
    .join(" ");

  //! преобразуем информацию для вывода
  const inf = [
    props.item?.localityDeparture,
    props.item?.profession,
    props.item?.date,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className={styles.Card}>
      <img
        src={
          props.item?.img
            ? `${server}/${props.item?.img}`
            : "./../../img/notfoto.png"
        }
        alt="foto"
      />
      <div className={styles.cardText}>
        <span className={styles.name}>{fio}</span>
        <span className={styles.info}>{inf}</span>
      </div>
    </div>
  );
}

export default Card;
