import { useEffect, useState } from "react";
import styles from "./PersonalArchive.module.scss";
import { ReactComponent as ArrowLeft } from "./../../imgs/arrowLeft.svg";
import { ReactComponent as PageArrow } from "./../../imgs/pageArrow.svg";
import { Link } from "react-router-dom";

function PersonalArchive() {
  const [imgs, setImgs] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<number>(0);

  useEffect(() => {
    setImgs([
      "./img/arhiv.png",
      "./img/imgSlider/1.png",
      "./img/imgSlider/2.png",
      "./img/imgSlider/3.png",
      "./img/imgSlider/4.png",
      "./img/imgSlider/5.png",
      "./img/imgSlider/6.png",
      "./img/imgSlider/7.png",
      "./img/imgSlider/8.png",
      "./img/imgSlider/9.png",
      "./img/imgSlider/10.png",
      "./img/imgSlider/11.png",
      "./img/imgSlider/12.png",
    ]);
  });

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
          <img src={imgs[selectedImg]} alt="foto" />
          {/* <img src="./img/arhiv.png" alt="foto" /> */}
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
              <img src={el} alt="a" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PersonalArchive;
