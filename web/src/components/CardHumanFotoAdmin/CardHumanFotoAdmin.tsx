import { apiDeleteFotoAdmin } from "../../api/ApiRequest";
import styles from "./CardHumanFotoAdmin.module.scss";

function CardHumanFotoAdmin(props: any) {
  const server = process.env.REACT_APP_API_URL;
  const funDeleteFoto = () => {
    const imgUrl = props.img.split("/");

    // let formData = new FormData();
    // formData.append("id", props.idHuman as any);
    // formData.append("file", imgUrl[imgUrl.length - 1] as any);
    // formData.append("type", props.id as any);

    const qery = `?id=${props.idHuman}&file=${imgUrl[imgUrl.length - 1]}&type=${
      props.id
    }`;
    apiDeleteFotoAdmin(qery).then((res) => {
      console.log("удалть фото", res);
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
