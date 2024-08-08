import styles from "./CardAdmin.module.scss"
function CardAdmin() {
  return (
    <div className={styles.CardAdmin}>
      <div className={styles.CardAdminImg}>
        <img src="./../../img/delete.svg" alt="man" />
        <img src="./../../img/man.png" alt="man" />
        <img src="./../../img/edit.svg" alt="man" />
      </div>
      <div className={styles.cardText}>
        <span className={styles.name}>Ирклиенко Михаил Иванович</span>
        <span className={styles.info}>г. Таганрог, рабочий, 1908 г.</span>
      </div>
    </div>
  );
}

export default CardAdmin;
