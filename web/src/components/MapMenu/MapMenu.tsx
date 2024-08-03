import { useSelector } from "react-redux";
import styles from "./MapMenu.module.scss";
import { RootState } from "../../store/store";

function MapMenu(props: any) {
  const store = useSelector((state: RootState) => state.campsSlice);
  const pointData = store.camps.find((el) => el.id === store.selectedPoint.id);

  console.log(store.camps);
  return (
    <div className={styles.MapMenu}>
      <div onClick={props.funShowMenu} className={styles.openButton}>
        <img
          style={!props.menuOpen ? { transform: "rotate(-180deg)" } : {}}
          src="./img/arrow.svg"
          alt="<"
        />
      </div>
      <div className={styles.head}>
        <h2>{pointData?.name}</h2>
        <p className={styles.adress}>{pointData?.address}</p>
        <p className={styles.info}>{pointData?.info}</p>
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
