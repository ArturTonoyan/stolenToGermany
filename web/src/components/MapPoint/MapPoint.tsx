import { Placemark } from "react-yandex-map";
import styles from "./MapPoint.module.scss";
import { useDispatch } from "react-redux";
import { setModalOpen, setSelectedPoint } from "../../store/basic/camps.slice";
// import { RootState } from "../../store/store";

function MapPoint(props: any) {
  const dispatch = useDispatch();
  // const store = useSelector((state: RootState) => state.campsSlice);

  const funClickPoint = () => {
    const id = props.item.locality || "";
    dispatch(setSelectedPoint({ id }));
    dispatch(setModalOpen({ action: true }));
  };
  console.log("props.item", props);

  const getBalun = () => {
    return `<div id=${props.item.locality} class=${styles.balloon}>
        <h3>Трудовые лагеря в <br/>${props.item.locality}</h3>
        <p style="font-size: 18px; padding: 0; margin-top: 8px "}>Найдено ${props?.count} человек<p/>
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
        defaultGeometry={props.item?.point}
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
