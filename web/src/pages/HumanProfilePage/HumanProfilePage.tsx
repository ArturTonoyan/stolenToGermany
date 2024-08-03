import { Link } from "react-router-dom";
import styles from "./HumanProfilePage.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { apiGetCamps } from "../../store/basic/camps.slice";

function HumanProfilePage() {
  const store = useSelector((state: RootState) => state.campsSlice);
  const [startCoords, setStartCoords] = useState<any>([47.221958, 39.718333]);
  const [endCoords, setEndCoords] = useState<any>([52.516363, 13.378906]);
  const [route, setRoute] = useState<any>(null);
  const [points, setPoints] = useState<any>([]);
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(apiGetCamps());
  }, []);

  useEffect(() => {
    const koor = store?.camps.find(
      (el) => el.id === store.selectedPoint.id + ""
    )?.coordinates;
    setEndCoords(koor);
  }, [store?.camps]);

  //! определение своего местоположения
  useEffect(() => {
    const handleGeolocationSuccess = (position: any) => {
      const koor = [position.coords.latitude, position.coords.longitude];
      if (koor) {
        setStartCoords(koor);
      }
    };
    const handleGeolocationError = (error: any) => {
      console.error("Error getting location:", error);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getRoute = async () => {
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=false&alternatives=false&steps=true`
      );
      setRoute(response.data);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  useEffect(() => {
    getRoute();
  }, [startCoords, endCoords]);

  useEffect(() => {
    if (route) {
      const coords = route?.routes[0]?.legs[0]?.steps.map(
        (el: any) => el.intersections[0]?.location
      );
      const minLat = Math.min(
        ...coords.map(([, lat]: [number, number]) => lat)
      );
      const maxLat = Math.max(
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
    <div className={styles.HumanProfilePage}>
      <div className={styles.title}>
        <div className={styles.humenInfo}>
          <div className={styles.foto}>
            <img src="./img/man.png" alt="men" />
          </div>
          <div className={styles.name}>
            <Link to="#">Ирклиенко Михаил Иванович</Link>
            <div className={styles.arhiv}>
              <p>Личный архив</p> <img src="./img/arhiv.svg" alt="a" />
            </div>
          </div>
        </div>
        <div className={styles.point}>
          <div
            style={
              points.length > 0
                ? { top: points[0][1], left: points[0][0] }
                : { top: "0" }
            }
            className={styles.point1}
          >
            Иншиздорф
          </div>
          <div
            style={
              points.length > 0
                ? {
                    top: points[points.length - 1][1],
                    left: points[points.length - 1][0],
                  }
                : { top: "0" }
            }
            className={styles.point2}
          >
            Ростов
          </div>
          <div className={styles.randomLine}>
            <svg>
              <polyline
                // points="0,0 420,230"
                points={points
                  .map(([x, y]: [number, number]) => `${x},${y}`)
                  .join(" ")}
                style={{
                  fill: "none",
                  stroke: "black",
                  strokeWidth: "2",
                }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HumanProfilePage;
