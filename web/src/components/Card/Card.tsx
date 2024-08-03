import { useDispatch } from "react-redux";
import styles from "./Card.module.scss";
import { setSelectedPoint } from "../../store/basic/camps.slice";
function Card(props: any) {
  const dispatch = useDispatch();
  const funClickPoint = () => {
    const id = props.item.id || "";
    dispatch(setSelectedPoint({ id }));
  };

  return (
    <div className={styles.Card} onClick={funClickPoint}>
      <img src="./img/man.png" alt="man" />
      <div className={styles.cardText}>
        <span className={styles.name}>{props.item.name}</span>
        <span className={styles.info}>г. Таганрог, рабочий, 1908 г.</span>
      </div>
    </div>
  );
}

export default Card;
