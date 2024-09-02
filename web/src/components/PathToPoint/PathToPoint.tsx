// import { useSelector } from "react-redux";
import styles from "./PathToPoint.module.scss";
// import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { alternative } from "./PathToPointData";
function PathToPoint(props: any) {
  // const store = useSelector((state: RootState) => state.campsSlice);
  const [route, setRoute] = useState<any>(null);
  const [points, setPoints] = useState<any>([]);

  const getRoute = async () => {
    try {
      const resp1 = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          props.localityDeparture
        )}&format=json&limit=1`
      );
      const resp2 = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          props.localityWork
        )}&format=json&limit=1`
      );
      console.log(
        "resp",
        props.localityDeparture,
        resp1.data[0].lat,
        resp1.data[0].lon
      );
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${resp1.data[0].lon},${resp1.data[0].lat};${resp2.data[0].lon},${resp2.data[0].lat}?overview=false&alternatives=false&steps=true`
        // `https://router.project-osrm.org/route/v1/driving/${resp2.data[0].lon},${resp2.data[0].lat};${resp1.data[0].lon},${resp1.data[0].lat}?overview=false&alternatives=false&steps=true`
      );
      setRoute(response.data);
    } catch (error) {
      console.error("Error fetching route:", error);
      setPoints(alternative);
    }
  };

  useEffect(() => {
    setRoute(null);
    setPoints([]);
    getRoute();
  }, [props.localityDeparture, props.localityWork]);

  useEffect(() => {
    if (route) {
      const coords = route?.routes[0]?.legs[0]?.steps.map(
        (el: any) => el.intersections[0]?.location
      );
      const minLat = Math.max(
        ...coords.map(([, lat]: [number, number]) => lat)
      );
      const maxLat = Math.min(
        ...coords.map(([, lat]: [number, number]) => lat)
      );
      const minLon = Math.min(...coords.map(([lon]: [number]) => lon));
      const maxLon = Math.max(...coords.map(([lon]: [number]) => lon));
      const scaleX = 420 / (maxLon - minLon);
      const scaleY = 230 / (maxLat - minLat);
      const points = coords.map(([lonValue, latValue]: [number, number]) => {
        const lonNumber: number = lonValue;
        const latNumber: number = latValue;
        return [
          Math.round((lonNumber - minLon) * scaleX),
          Math.round((latNumber - minLat) * scaleY),
        ];
      });
      setPoints(points);
    }
  }, [route]);

  return (
    <div
      className={styles.PathToPoint}
      style={
        points.length === 0
          ? { opacity: "0" }
          : { opacity: "1", transition: "all 0.15s linear" }
      }
    >
      <div
        style={
          points.length > 0
            ? { top: points[0][1], left: points[0][0] }
            : { top: "0" }
        }
        className={styles.point1}
      >
        {props.localityDeparture}
      </div>
      <div
        style={
          points.length > 0
            ? {
                top: points[points.length - 1][1] + 11,
                left: points[points.length - 1][0] - 5,
              }
            : { top: "0" }
        }
        className={styles.point2}
      >
        {props.localityWork}
      </div>
      <div
        className={
          points.length > 0 ? styles.randomLineActive : styles.randomLine
        }
      >
        <svg>
          <polyline
            // points="0,0 420,230"
            points={points
              .map(([x, y]: [number, number]) => `${x},${y}`)
              .join(" ")}
            style={{
              fill: "none",
              stroke: "#5b6a99",
              strokeWidth: "2",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export default PathToPoint;
