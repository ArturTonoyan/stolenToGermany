import { Link, useNavigate } from "react-router-dom";
import PathToPoint from "../../components/PathToPoint/PathToPoint";
import styles from "./HumanProfile.module.scss";
import { ReactComponent as PageArrow } from "./../../imgs/pageArrow.svg";
import { useEffect, useState } from "react";
import { apiGetOstarbaiter } from "../../api/ApiRequest";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function HumanProfile() {
  const store = useSelector((state: RootState) => state.peopleSlice);
  const [imgUrl, setImgUrl] = useState("./../../img/notfoto.png");

  interface Human {
    addressAfterReturning: string;
    date: string;
    dateDeparture: string;
    departure: string;
    id: string;
    img: string;
    infoOfDeath: string;
    infoOfRepatriation: string;
    links: string;
    localityDeparture: string;
    localityWork: string;
    name: string;
    patronymic: string;
    profession: string;
    surname: string;
  }

  const [humanData, setHumanData] = useState<Human>({
    addressAfterReturning: "",
    date: "",
    dateDeparture: "",
    departure: "",
    id: "",
    img: "",
    infoOfDeath: "",
    infoOfRepatriation: "",
    links: "",
    localityDeparture: "",
    localityWork: "",
    name: "",
    patronymic: "",
    profession: "",
    surname: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (store.selectedPerson === "") {
      navigate("/SearchPage/SearchModule");
    }
    if (store.selectedPerson) {
      apiGetOstarbaiter(store.selectedPerson).then((req) => {
        console.log("req", req);
        if (req?.status === 200) {
          setHumanData(req?.data.ostarbaiter);
        }
      });
    }
  }, [store.selectedPerson]);

  useEffect(() => {
    if (humanData?.img) {
      try {
        setImgUrl(require(`D:/GIT_File/stolenToGermany/api/${humanData?.img}`));
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
      }
    }
  }, [humanData?.img]);

  return (
    <div className={styles.HumanProfile}>
      <div className={styles.HumanProfile__inner}>
        <div className={styles.HumanProfile__card}>
          <img
            className={styles.BgImgCardHuman}
            src="./../../img/CardHumanBg.png"
            alt="Bg"
          />
          <div className={styles.pageArrow}>
            <Link to="./../SearchModule">
              <PageArrow />
            </Link>
          </div>
          <div>
            <img src={imgUrl} alt="man" />
          </div>
          <div className={styles.HumanProfile__card__info}>
            <div className={styles.HumanProfile__card__info__name}>
              <p>{humanData?.surname}</p>
              <p>{humanData?.name}</p>
              <p>{humanData?.patronymic}</p>
            </div>
            <Link to="../../PersonalArchive">
              <p className={styles.HumanProfile__card__info__archiv}>
                <span>Личный архив</span>
                <img src="./../img/Archiv.svg" />
              </p>
            </Link>
          </div>
          <div className={styles.way}>
            <PathToPoint
              localityDeparture={humanData?.localityDeparture}
              localityWork={humanData?.localityWork}
            />
          </div>
        </div>

        <div className={styles.HumanProfile__info}>
          <p className={styles.HumanProfile__info__link}>
            Год рождения — <span>{humanData?.date}</span>
          </p>
          <p>
            Профессия на момент отправки в Германию —{" "}
            <span>{humanData?.profession}</span>
          </p>
          <p className={styles.HumanProfile__info__link}>
            Адрес проживания до угона на принудительные работы в Германию —{" "}
            <span>
              {humanData?.addressAfterReturning || "информация отсутсвует"}
            </span>
          </p>
          <p>
            Дата угона на принудительные работы в Германию —{" "}
            <span>{humanData?.dateDeparture || "информация отсутсвует"}</span>
          </p>
          <p className={styles.HumanProfile__info__link}>
            Населенный пункт откуда угнан на принудительные работы —{" "}
            <span>
              {humanData?.localityDeparture || "информация отсутсвует"}
            </span>
          </p>
          <p>
            Место трудоиспользования на принудительных работах в Германии —{" "}
            <span>{humanData?.localityWork || "информация отсутсвует"}</span>
          </p>
          <p className={styles.HumanProfile__info__link}>
            Дата, место и причина смерти на момент пребывания в Германии —{" "}
            <span>{humanData?.infoOfDeath || "информация отсутсвует"}</span>
          </p>
          <p className={styles.HumanProfile__info__link}>
            Дата и место репатриации —{" "}
            <span>
              {humanData?.infoOfRepatriation || "информация отсутсвует"}
            </span>
          </p>
          <p className={styles.HumanProfile__info__link}>
            Адрес проживания после возвращения в СССР —{" "}
            <span>
              {humanData?.addressAfterReturning || "информация отсутсвует"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HumanProfile;
