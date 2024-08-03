import React from "react";
import styles from "./MapPage.module.scss";
import MapModule from "../../modules/MapModule/MapModule";

function MapPage() {
  return (
    <div className={styles.MapPage}>
      <MapModule />
    </div>
  );
}

export default MapPage;
