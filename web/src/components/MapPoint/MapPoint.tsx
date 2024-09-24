import { Placemark } from "react-yandex-map";
import styles from "./MapPoint.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen, setSelectedPoint } from "../../store/basic/camps.slice";
import { RootState } from "../../store/store";
import { useEffect, useRef } from "react";
// import { RootState } from "../../store/store";

function MapPoint(props: any) {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.campsSlice);

  const funClickPoint = () => {
    const id = props.item.locality || "";
    dispatch(setSelectedPoint({ id }));
    dispatch(setModalOpen({ action: true }));
  };
  console.log("props.item", props);

  const getBalun = () => {
    return `<div id=${props.item.locality} class=${styles.balloon}>
        <h3>Трудовые лагеря в <br/>${props.item.locality}</h3>
        <p style="font-size: 18px; padding: 0; margin-top: 8px "}>Найдено ${
          store.selectedPoint?.count || 0
        } человек<p/>
      </div>`;
  };

  const plRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   // Найдите все элементы с классом "ymaps-2-1-79-image"
  //   const elements = document.querySelectorAll(".ymaps-2-1-79-image");
  //   // Перебирайте каждый элемент и добавьте число к классу
  //   console.log("elements", elements);
  //   elements.forEach((element, index) => {
  //     element.innerHTML = `<span class="number" style="
  //         width: 100%;
  //         heigth: 100%;
  //         color: white;
  //         display: flex;
  //         justify-content: center;
  //         align-items: center;
  //         font-size: 16px;
  //         font-weight: bold;
  //     ">${index + 1}</span>`;
  //   });
  // }, [plRef, props.item]);
  const svgData = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#F8F7FF"/>
    <circle cx="16" cy="16" r="12" fill="#5B6A99"/>
    <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${
      10000 > 999 ? ">999" : props.item?.count || 0
    }</text>
    </svg>`;

  const iconImageHref = `data:image/svg+xml;base64,${btoa(svgData)}`;

  return (
    <div className={styles.MapPoint}>
      <Placemark
        ref={plRef}
        onClick={funClickPoint}
        // onBalloonClose={handleBalloonClose}
        modules={["geoObject.addon.balloon"]}
        defaultGeometry={props.item?.point}
        properties={{
          balloonContentBody: getBalun(),
        }}
        options={{
          iconLayout: "default#image",
          // iconImageHref: "./img/point.svg",
          iconImageHref: iconImageHref,
        }}
      ></Placemark>
    </div>
  );
}

export default MapPoint;
