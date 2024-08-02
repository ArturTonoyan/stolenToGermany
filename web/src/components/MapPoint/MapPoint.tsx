import { Placemark } from "react-yandex-map";
import styles from "./MapPoint.module.scss";
function MapPoint(props: any) {
  const getBalun = () => {
    return `<div class=${styles.balloon}>
        <h3>Трудовые лагеря в Берлине</h3>
        <button>Узнать больше</button>
      </div>`;
  };

  return (
    <div className={styles.MapPoint}>
      <Placemark
        // onClick={true}
        modules={["geoObject.addon.balloon"]}
        defaultGeometry={props.defaultGeometry}
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
