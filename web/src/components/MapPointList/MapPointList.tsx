import { useSelector } from "react-redux";
import MapPoint from "../MapPoint/MapPoint";
import styles from "./MapPointList.module.scss";
import { RootState } from "../../store/store";

function MapPointList() {
  const store = useSelector((state: RootState) => state.campsSlice);
  return (
    <div className={styles.MapPointList}>
      {store.camps.map((item) => (
        <MapPoint
          key={item?.locality}
          item={item}
          count={store.camps?.length}
        />
      ))}
    </div>
  );
}

export default MapPointList;
