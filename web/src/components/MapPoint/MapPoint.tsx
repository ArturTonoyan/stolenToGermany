import { Placemark } from "react-yandex-map";
import styles from "./MapPoint.module.scss";
function MapPoint(props: any) {
  return (
    <div className={styles.MapPoint}>
      <Placemark
        // onClick={true}
        modules={["geoObject.addon.balloon"]}
        defaultGeometry={props.defaultGeometry}
        properties={{
          balloonContentBody: `<div class="content__body" id=${1} onClick=${true} >
        <div  class="content__text">${1}</div>

        <div class="content__prise">

        </div>
    </div>
  `,
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
