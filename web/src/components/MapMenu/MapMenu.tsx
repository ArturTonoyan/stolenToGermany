import { useDispatch, useSelector } from "react-redux";
import styles from "./MapMenu.module.scss";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { apiGetPeopleCamps } from "../../api/ApiRequest";
import { setSelectedPerson } from "../../store/basic/people.slice";
import { useNavigate } from "react-router-dom";
import { setMapPeopleCount } from "../../store/basic/camps.slice";

function MapMenu(props: any) {
  const [ostarbairet, setSetostarbairet] = useState<any>([]);
  const store = useSelector((state: RootState) => state.campsSlice);
  const pointData = store.camps.find(
    (el) => el.locality === store.selectedPoint.id
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (pointData?.locality) {
      const city = pointData?.locality.replace("г. ", "");
      const param = `?localityWork=${city}`;
      apiGetPeopleCamps(param).then((req) => {
        if (req?.status === 200) {
          console.log("req люди", req.data);
          setSetostarbairet(req.data?.ostarbaiters);
          dispatch(
            setMapPeopleCount({
              count: req.data?.count || req.data?.ostarbaiters.length,
            })
          );
        }
      });
    }
  }, [store.selectedPoint.id]);

  const clickCard = (id: string) => {
    console.log(id);
    dispatch(setSelectedPerson({ id }));
    navigate("/SearchPage/HumanProfile");
  };

  return (
    <div className={styles.MapMenu}>
      <div onClick={props.funShowMenu} className={styles.openButton}>
        <img
          style={!props.menuOpen ? { transform: "rotate(-180deg)" } : {}}
          src="./img/arrow.svg"
          alt="<"
        />
      </div>
      <div className={styles.head}>
        <h2>{pointData?.locality}</h2>
        {/* <p className={styles.adress}>{pointData?.address}</p> */}
        {/* <p className={styles.info}>{pointData?.info}</p> */}
      </div>

      <ul className={styles.peopleList}>
        {ostarbairet?.map((item: any) => (
          <li key={item?.id} onClick={() => clickCard(item?.id)}>
            <p>
              {[item?.surname, item?.name, item?.patronymic]
                .filter(Boolean)
                .join(" ")}
            </p>
            <p>
              {[item?.profession, item?.date].filter(Boolean).join(", ")}
              {item?.date && " г.р."}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapMenu;
