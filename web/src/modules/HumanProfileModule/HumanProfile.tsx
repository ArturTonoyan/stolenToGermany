import { Link, useNavigate } from "react-router-dom";
import PathToPoint from "../../components/PathToPoint/PathToPoint";
import styles from "./HumanProfile.module.scss";
import { ReactComponent as PageArrow } from "./../../imgs/pageArrow.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { apiGetOstarbaiter } from "../../api/ApiRequest";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import HumanInfoComponent from "../../components/HumanInfoComponent/HumanInfoComponent";
import { humaInfo, Human, HumanInfo } from "./HumanProfileData";
import HumanSliderFoto from "../../components/HumanSliderFoto/HumanSliderFoto";
import DataContext from "../../context";

function HumanProfile(props: any) {
  const context = useContext(DataContext);
  const store = useSelector((state: RootState) => state.peopleSlice);
  const server = context.REACT_APP_API_URL;
  const [showPath, setShowPath] = useState(false);
  const [imgOpen, setImgOpen] = useState([]);

  const [humanData, setHumanData] = useState<Human>({
    addressAfterReturning: "",
    date: "",
    dateDeparture: "",
    departure: "",
    id: "",
    img: "",
    infoOfDeath: "",
    infoOfRepatriation: "",
    links: {},
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
        if (req?.status === 200) {
          setHumanData(req?.data.ostarbaiter);
          setShowPath(true);
        }
      });
    }
  }, [store.selectedPerson]);

  //! функция определения класса у p
  const funGetClassActive = (key: string) => {
    if (humanData?.links && humanData?.links[key]) {
      return styles.HumanProfile__info__link;
    } else {
      return "";
    }
  };

  //! функция открывание фото по типу
  const funOpenFoto = (key: string) => {
    if (humanData?.links && humanData?.links[key]) {
      setImgOpen(humanData?.links[key]);
    }
  };

  //! закрыть фото
  const funClousFoto = () => {
    setImgOpen([]);
  };

  const [classNameSet, setClassName] = useState(
    styles.HumanProfile__card__info__name
  );
  const funMouseEnter = () => {
    if (
      humanData?.surname?.length > 15 ||
      humanData?.name?.length > 15 ||
      humanData?.patronymic?.length > 15
    ) {
      let cl = `${styles.HumanProfile__card__info__name} ${styles.nameScrollAnim}`;
      setClassName(cl);
    }
  };

  const funMouseOut = () => {
    setClassName(styles.HumanProfile__card__info__name);
  };

  const goNextLink = () => {
    if (
      humanData &&
      humanData?.links &&
      Object.keys(humanData?.links).length > 0
    ) {
      if (document.location.pathname.includes("AdminPage")) {
        navigate("../../AdminPage/PersonalArchive");
      } else {
        navigate("../../PersonalArchive");
      }
    } else {
      navigate("../../NoSearchResults");
    }
  };

  return (
    <div className={styles.HumanProfile}>
      {imgOpen.length !== 0 && (
        <HumanSliderFoto imgOpen={imgOpen} funClousFoto={funClousFoto} />
      )}
      <div className={styles.HumanProfile__inner}>
        <div className={styles.HumanProfile__card}>
          <img
            className={styles.BgImgCardHuman}
            src="./../../img/CardHumanBg.png"
            alt="Bg"
          />
          <div className={styles.pageArrow}>
            <Link
              to={
                props.loc?.includes("AdminPage")
                  ? "../../AdminPage/AdminSearchResult"
                  : "./../SearchModule"
              }
            >
              <PageArrow />
            </Link>
          </div>
          <div className={styles.HumanImg}>
            <img
              src={
                humanData?.img
                  ? `${server}/${humanData?.img}`
                  : "./../../img/notfoto.png"
              }
              alt="foto"
            />
          </div>
          <div className={styles.HumanProfile__card__info}>
            <div
              className={classNameSet}
              onMouseEnter={funMouseEnter}
              onMouseLeave={funMouseOut}
            >
              {humanData?.surname && <p>{humanData?.surname}</p>}
              {humanData?.name && <p>{humanData?.name}</p>}
              {humanData?.patronymic && <p>{humanData?.patronymic}</p>}
            </div>

            <p
              className={styles.HumanProfile__card__info__archiv}
              onClick={() => goNextLink()}
            >
              <span>Личный архив</span>
              <img src="./../img/Archiv.svg" />
            </p>
          </div>
          <div className={styles.way}>
            {showPath &&
              humanData?.localityDeparture !== "" &&
              humanData?.localityWork !== "" && (
                <PathToPoint
                  localityDeparture={humanData?.localityDeparture}
                  localityWork={humanData?.localityWork}
                />
              )}
          </div>
        </div>

        <div className={styles.HumanProfile__info}>
          {humaInfo.map((item: HumanInfo) => (
            <HumanInfoComponent
              funOpenFoto={funOpenFoto}
              funGetClassActive={funGetClassActive}
              type={item.type}
              text={item.text}
              data={humanData[item.dataKey] || "информация отсутствует"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HumanProfile;
