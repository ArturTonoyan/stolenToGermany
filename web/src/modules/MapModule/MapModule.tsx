import MapComponent from "../../components/MapComponent/MapComponent";
import MapMenu from "../../components/MapMenu/MapMenu";
import styles from "./MapModule.module.scss";
import { YMaps } from "react-yandex-map";

function MapModule() {
  return (
    <div className={styles.MapModule}>
      <YMaps query={{ apikey: "f3c78576-996b-4eaa-84f8-12a8520d276a" }}>
        <MapComponent />
        <div className={styles.menu}>
          <MapMenu />
        </div>
      </YMaps>
    </div>
  );
}

export default MapModule;
