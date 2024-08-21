import styles from "./Card.module.scss";
function Card(props: any) {
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
      <img src="./../../img/man.png" alt="man" />
      <div className={styles.cardText}>
        <span className={styles.name}>{fio}</span>
        <span className={styles.info}>{inf}</span>
      </div>
    </div>
  );
}

export default Card;
