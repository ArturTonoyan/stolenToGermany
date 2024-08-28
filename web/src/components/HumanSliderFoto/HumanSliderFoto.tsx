import styles from "./HumanSliderFoto.module.scss";
import { ReactComponent as ArrowLeft } from "./../../imgs/arrowLeft.svg";
import { ReactComponent as PageArrow } from "./../../imgs/pageArrow.svg";
import { useState } from "react";
function HumanSliderFoto(props: any) {
  const server = process.env.REACT_APP_API_URL;
  const [selectedImg, setSelectedImg] = useState<number>(0);
  //! скролл влево
  const funScrollLeft = () => {
    if (selectedImg - 1 < 0) {
      setSelectedImg(props.imgOpen.length - 1);
    } else {
      setSelectedImg(selectedImg - 1);
    }
  };
  //! скролл вправо
  const funScrollRigth = () => {
    if (selectedImg + 1 > props.imgOpen.length - 1) {
      setSelectedImg(0);
    } else {
      setSelectedImg(selectedImg + 1);
    }
  };
  console.log("props.imgOpen", props.imgOpen);
  return (
    <div className={styles.HumanSliderFoto}>
      <button onClick={funScrollLeft}>
        <ArrowLeft />
      </button>
      <div className={styles.fotoTypeOpen_inner}>
        <img src={`${server}/${props.imgOpen[selectedImg]}`} alt="foto" />
        <img onClick={props.funClousFoto} src="./../img/x.svg" alt="img" />
      </div>
      <button onClick={funScrollRigth}>
        <ArrowLeft className={styles.rigth} />
      </button>
    </div>
  );
}

export default HumanSliderFoto;
