import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { apiGetOstarbaiter } from "../../../api/ApiRequest";
import styles from "./AdminPageEditArchiveModule.module.scss";
import { Link } from "react-router-dom";
import CardArchiveNotData from "../../../components/CardArchive/CardArchiveNotData";
import CardHumanFotoAdmin from "../../../components/CardHumanFotoAdmin/CardHumanFotoAdmin";
function AdminPageEditArchiveModule(props: any) {
  const store = useSelector((state: RootState) => state.peopleSlice);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    console.log("store", store.selectedPerson);
    apiGetOstarbaiter(store.selectedPerson).then((res) => {
      setData(res && res?.data?.ostarbaiter);
    });
  }, []);
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const humaInfo = [
    {
      id: 1,
      type: "scanPassport",
      text: "Удостоверение личности",
    },
    {
      id: 2,
      type: "employmentHistory",
      text: "Профессия на момент отправки в Германиюe",
    },
    {
      id: 3,
      type: "addressBeforeShipping",
      text: "Адрес проживания до угона на принудительные работы в Германиюe",
    },
    {
      id: 4,
      type: "departureDate",
      text: "Дата угона на принудительные работы в Германиюe",
    },
    {
      id: 5,
      type: "departure",
      text: "Населенный пункт откуда угнан на принудительные работыe",
    },
    {
      id: 6,
      type: "arrival",
      text: "Место трудоиспользования на принудительных работах в Германииe",
    },
    {
      id: 7,
      type: "deathInformation",
      text: "Дата, место и причина смерти на момент пребывания в Германииe",
    },
    {
      id: 8,
      type: "repatriationInfo",
      text: "Дата и место репатриацииe",
    },
    {
      id: 9,
      type: "addressAfterShipping",
      text: "Адрес проживания после возвращения в СССР ",
    },
  ];

  return (
    <div className={styles.AdminPageEditArchiveModule}>
      <div className={styles.AdminPageEditArchiveModuleInner}>
        <Link to="/AdminPage/AdminPanelModule">
          {" "}
          <img
            className={styles.ArrowBack}
            src="./../img/pageArrow.svg"
            alt="<"
          />{" "}
        </Link>
        <h1 className={styles.title}>Редактирование личного архива:</h1>
        <div className={styles.cardContainer}>
          {data?.img && (
            <CardHumanFotoAdmin
              img={data?.img}
              text={"Фото профиля"}
              idHuman={data?.id}
              id={0}
            />
          )}
          {data?.links &&
            Object.keys(data?.links).map((item: any) =>
              data?.links[item].map((el: any) => (
                <CardHumanFotoAdmin
                  img={el}
                  idHuman={data?.id}
                  text={humaInfo.find((el) => el.type === item)?.text}
                  id={humaInfo.find((el) => el.type === item)?.id}
                />
              ))
            )}
          <CardArchiveNotData dataHuman={data} />
        </div>
      </div>
    </div>
  );
}

export default AdminPageEditArchiveModule;
