import MapPointList from "../MapPointList/MapPointList";
import styles from "./MapComponent.module.scss";
import { GeolocationControl, Map, ZoomControl } from "react-yandex-map";

function MapComponent() {
  return (
    <div className={styles.MapComponent}>
      <Map
        width={"100%"}
        height={"100%"}
        state={{
          center: [52.516363, 13.378906],
          zoom: 7,
        }}
      >
        <GeolocationControl options={{ float: "left" }} />
        <ZoomControl options={{ float: "left" }} />
        <MapPointList />
      </Map>
    </div>
  );
}

export default MapComponent;
