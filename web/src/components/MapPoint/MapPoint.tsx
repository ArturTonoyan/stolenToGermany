import { Placemark } from "react-yandex-map";
import styles from "./MapPoint.module.scss";
import { useDispatch } from "react-redux";
import { setSelectedPoint } from "../../store/basic/camps.slice";
function MapPoint(props: any) {
  const dispacth = useDispatch();

  const getBalun = () => {
    return `<div class=${styles.balloon}>
        <h3>Трудовые лагеря в Берлине</h3>
        <button>Узнать больше</button>
      </div>`;
  };

  const funClickPoint = () => {
    const id = props.item.id || "";
    dispacth(setSelectedPoint({ id }));
  };

  return (
    <div className={styles.MapPoint}>
      <Placemark
        onClick={funClickPoint}
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
