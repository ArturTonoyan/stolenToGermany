import { useDispatch, useSelector } from "react-redux";
import MapPoint from "../MapPoint/MapPoint";
import styles from "./MapPointList.module.scss";
import { apiGetCamps } from "../../store/basic/camps.slice";
import { useEffect } from "react";
import { RootState } from "../../store/store";

function MapPointList() {
  const store = useSelector((state: RootState) => state.campsSlice);
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(apiGetCamps());
  }, []);

  return (
    <div className={styles.MapPointList}>
      {store.camps.map((item) => (
        <MapPoint key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MapPointList;
