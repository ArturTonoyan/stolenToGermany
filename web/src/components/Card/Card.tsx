import styles from "./Card.module.scss"
function Card() {
  return (
    <div className={styles.Card}>
      <img src="./img/mans.png" alt="man" />
      <div className={styles.cardText}>
        <span className={styles.name}>Ирклиенко Михаил Иванович</span>
        <span className={styles.info}>г. Таганрог, рабочий, 1908 г.</span>
      </div>
    </div>
  );
}

export default Card;
