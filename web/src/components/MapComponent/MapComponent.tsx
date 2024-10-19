import MapPointList from "../MapPointList/MapPointList";
import styles from "./MapComponent.module.scss";
import {
  GeolocationControl,
  Map,
  // SearchControl,
  ZoomControl,
} from "react-yandex-map";

function MapComponent() {
  return (
    <div className={styles.MapComponent}>
      <Map
        width={"100%"}
        height={"100%"}
        defaultState={{
          center: [52.516363, 13.378906],
          zoom: 7,
        }}
        options={{
          minZoom: 4,
        }}
      >
        <GeolocationControl options={{ float: "left" }} />
        <ZoomControl options={{ float: "left" }} />
        <MapPointList />
        {/* <SearchControl
          options={{
            float: "right",
            size: "large",
            noPlacemark: true,
          }}
        /> */}
      </Map>
    </div>
  );
}

export default MapComponent;
