import { useSelector } from "react-redux";
import MapPoint from "../MapPoint/MapPoint";
import styles from "./MapPointList.module.scss";
import { RootState } from "../../store/store";
import { Clusterer } from "react-yandex-map";

function MapPointList() {
  const store = useSelector((state: RootState) => state.campsSlice);
  return (
    <div className={styles.MapPointList}>
      <Clusterer
        options={{
          gridSize: 100,
          preset: "islands#darkBlueClusterIcons",
          groupByCoordinates: false,
          maxZoom: 8,
          minClusterSize: 2,
        }}
      >
        {store.camps.map((item) => (
          <MapPoint
            key={item?.locality}
            item={item}
            count={store.camps?.length}
          />
        ))}
      </Clusterer>
    </div>
  );
}

export default MapPointList;
