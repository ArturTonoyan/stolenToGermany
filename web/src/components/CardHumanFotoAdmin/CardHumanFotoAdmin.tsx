import { apiDeleteFotoAdmin } from "../../api/ApiRequest";
import styles from "./CardHumanFotoAdmin.module.scss";
import config from "./../../config.json";

function CardHumanFotoAdmin(props: any) {
  const server = config.REACT_APP_API_URL;
  const funDeleteFoto = () => {
    const imgUrl = props.img.split("/");

    const qery = `?id=${props.idHuman}&file=${imgUrl[imgUrl.length - 1]}&type=${
      props.id
    }`;
    apiDeleteFotoAdmin(qery).then((res) => {
      if (res?.status === 200) {
        props.apiGetData();
        props.funUpdatePeople();
      }
    });
  };
  return (
    <div className={styles.CardHumanFotoAdmin}>
      <div className={styles.fotoContainer}>
        <img
          src={props.img ? `${server}/${props.img}` : "./../../img/notfoto.png"}
          alt="img"
        />
        <div className={styles.blakBox}>
          <p>{props.text}</p>
        </div>
      </div>
      <div className={styles.btn}>
        <button onClick={funDeleteFoto}>Удалить файл</button>
      </div>
    </div>
  );
}

export default CardHumanFotoAdmin;
