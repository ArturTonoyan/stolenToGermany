import { Placemark } from "react-yandex-map";
import styles from "./MapPoint.module.scss";
import { useDispatch } from "react-redux";
import { setModalOpen, setSelectedPoint } from "../../store/basic/camps.slice";
// import { RootState } from "../../store/store";

function MapPoint(props: any) {
  const dispatch = useDispatch();
  // const store = useSelector((state: RootState) => state.campsSlice);

  const funClickPoint = () => {
    const id = props.item.id || "";
    dispatch(setSelectedPoint({ id }));
    dispatch(setModalOpen({ action: true }));
  };

  const getBalun = () => {
    return `<div id=${props.item.id} class=${styles.balloon}>
        <h3>${props.item.name}</h3>
      </div>`;
  };
  // const handleBalloonClose = () => {
  //   dispatch(setModalOpen({ action: false }));
  // };
  return (
    <div className={styles.MapPoint}>
      <Placemark
        onClick={funClickPoint}
        // onBalloonClose={handleBalloonClose}
        modules={["geoObject.addon.balloon"]}
        defaultGeometry={props.item?.coordinates}
        properties={{
          balloonContentBody: getBalun(),
        }}
        options={{
          iconLayout: "default#image",
          iconImageHref: "./img/point.svg",
        }}
      ></Placemark>
    </div>
  );
}

export default MapPoint;
