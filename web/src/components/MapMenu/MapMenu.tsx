import styles from "./MapMenu.module.scss";

function MapMenu() {
  return (
    <div className={styles.MapMenu}>
      <div className={styles.head}>
        <h2>Трудовые лагеря в Берлине</h2>
        <p className={styles.adress}>Адрес: Берлин, аллея Ландсбергер, 370</p>
        <p className={styles.info}>
          Lorem ipsum dolor sit amet consectetur. Quam adipiscing tempor congue
          massa. Tellus ut erat felis quis nisl eget volutpat. Integer viverra
          orci id sed. Massa pretium cursus vitae sapien ac varius feugiat. Orci
          imperdiet commodo a amet ut. Nunc tellus sit pharetra gravida
          ultricies morbi tortor. Vel commodo aliquam urna nulla. Urna nulla a
          sollicitudin duis neque. Etiam interdum amet tellus convallis ut.
          Augue vel suspendisse laoreet dolor.
        </p>
      </div>

      <ul className={styles.peopleList}>
        <li>
          <p>Ирклиенко Михаил Иванович</p>
          <p>рабочий, 1908 г.р.</p>
        </li>
      </ul>
    </div>
  );
}

export default MapMenu;
