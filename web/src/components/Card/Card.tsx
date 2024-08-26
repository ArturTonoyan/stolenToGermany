import { useEffect, useState } from "react";
import styles from "./Card.module.scss";
function Card(props: any) {
  const [imgUrl, setImgUrl] = useState("./../../img/notfoto.png");
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

  useEffect(() => {
    if (props.item?.img) {
      try {
        setImgUrl(
          require(`D:/GIT_File/stolenToGermany/api/${props.item?.img}`)
        );
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
      }
    }
  }, [props.item?.img]);

  console.log("imgUrl", imgUrl);
  return (
    <div className={styles.Card}>
      <img src={imgUrl} alt="foto" />
      <div className={styles.cardText}>
        <span className={styles.name}>{fio}</span>
        <span className={styles.info}>{inf}</span>
      </div>
    </div>
  );
}

export default Card;
