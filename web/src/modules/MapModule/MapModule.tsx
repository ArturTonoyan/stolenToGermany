import MapComponent from "../../components/MapComponent/MapComponent";
import MapMenu from "../../components/MapMenu/MapMenu";
import styles from "./MapModule.module.scss";
import { YMaps } from "react-yandex-map";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setModalOpen } from "../../store/basic/camps.slice";
import { useEffect } from "react";

function MapModule() {
  const store = useSelector((state: RootState) => state.campsSlice);
  const dispatch = useDispatch();
  const funShowMenu = (): void => {
    if (store.selectedPoint.id !== "") {
      dispatch(setModalOpen({ action: !store.selectedPoint.menuOpen }));
    }
  };

  useEffect(() => {
    dispatch(setModalOpen({ action: false }));
  }, []);

  return (
    <div className={styles.MapModule}>
      <div className={styles.loaderMain}>
        <span className={styles.loader}></span>
      </div>

      <YMaps query={{ apikey: "f3c78576-996b-4eaa-84f8-12a8520d276a" }}>
        <MapComponent />
        <div
          className={
            !store.selectedPoint.menuOpen ? styles.menuactive : styles.menu
          }
        >
          {store.selectedPoint.id && (
            <MapMenu
              funShowMenu={funShowMenu}
              menuOpen={store.selectedPoint.menuOpen}
            />
          )}
        </div>
      </YMaps>
    </div>
  );
}

export default MapModule;
