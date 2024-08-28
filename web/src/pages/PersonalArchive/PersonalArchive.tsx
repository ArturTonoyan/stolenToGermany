import { useEffect, useState } from "react";
import styles from "./PersonalArchive.module.scss";
import { ReactComponent as ArrowLeft } from "./../../imgs/arrowLeft.svg";
import { ReactComponent as PageArrow } from "./../../imgs/pageArrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { apiGetOstarbaiter } from "../../api/ApiRequest";

function PersonalArchive() {
  const [imgs, setImgs] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<number>(0);
  const store = useSelector((state: RootState) => state.peopleSlice);
  const server = process.env.REACT_APP_API_URL;

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
          const links = req?.data.ostarbaiter.links;
          const allLinks = links
            .reduce((acc: any, curr: any) => {
              return acc.concat(curr.employmentHistory, curr.scanPassport);
            }, [])
            .filter((el: any) => el !== undefined);
          console.log("allLinks", allLinks);
          setImgs(allLinks);
        }
      });
    }
  }, [store.selectedPerson]);

  //! скролл влево
  const funScrollLeft = () => {
    if (selectedImg - 1 < 0) {
      setSelectedImg(imgs.length - 1);
    } else {
      setSelectedImg(selectedImg - 1);
    }
  };

  //! скролл вправо
  const funScrollRigth = () => {
    if (selectedImg + 1 > imgs.length - 1) {
      setSelectedImg(0);
    } else {
      setSelectedImg(selectedImg + 1);
    }
  };

  //! выбрать фото
  const funSelectImg = (index: number) => {
    setSelectedImg(index);
  };

  // useEffect(() => {
  //   setImgs([
  //     "./img/arhiv.png",
  //     "./img/imgSlider/1.png",
  //     "./img/imgSlider/2.png",
  //     "./img/imgSlider/3.png",
  //     "./img/imgSlider/4.png",
  //     "./img/imgSlider/5.png",
  //     "./img/imgSlider/6.png",
  //     "./img/imgSlider/7.png",
  //     "./img/imgSlider/8.png",
  //     "./img/imgSlider/9.png",
  //     "./img/imgSlider/10.png",
  //     "./img/imgSlider/11.png",
  //     "./img/imgSlider/12.png",
  //   ]);
  // }, []);

  return (
    <div className={styles.PersonalArchive}>
      <img
        className={styles.BgImgCardHuman}
        src="./../../img/CardHumanBg.png"
        alt="Bg"
      />
      <div className={styles.container}>
        <div className={styles.pageArrow}>
          <Link to="../SearchPage/HumanProfile">
            <PageArrow />
          </Link>
        </div>
        <div className={styles.slider}>
          <button onClick={funScrollLeft}>
            <ArrowLeft />
          </button>
          <img
            src={
              imgs[selectedImg]
                ? `${server}/${imgs[selectedImg]}`
                : "./img/notfoto.png"
            }
            alt="foto"
          />
          <button onClick={funScrollRigth}>
            <ArrowLeft className={styles.rigth} />
          </button>
        </div>
        <div className={styles.styderPoints}>
          <ul>
            {imgs.map((_, index) => (
              <li
                onClick={() => funSelectImg(index)}
                key={index}
                className={index === selectedImg ? styles.active : ""}
              ></li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.imgs}>
        <ul>
          {imgs.map((el, index) => (
            <li key={index} onClick={() => funSelectImg(index)}>
              <img className={styles.lupa} src="./img/lupa.svg" alt="l" />
              <img
                src={el ? `${server}/${el}` : "./img/notfoto.png"}
                alt="foto"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PersonalArchive;
