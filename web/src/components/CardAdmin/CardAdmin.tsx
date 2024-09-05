import styles from "./CardAdmin.module.scss";
import { ReactComponent as DeleteIMG } from "../../imgs/delete.svg";
import { ReactComponent as EditIMG } from "../../imgs/edit.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OstarbaitersDelete, apiOstarbaiters } from "../../api/ApiRequest";
import { useDispatch } from "react-redux";
import {
  apiGetPeople,
  setSelectedPerson,
} from "../../store/basic/people.slice";
import notFoto from "./../../imgs/notfoto.png";

function CardAdmin(props: any) {
  const server = process.env.REACT_APP_API_URL;
  const [activDeleteCard, setActivDeleteCard] = useState<boolean>(false);
  console.log("props", props.item);
  const fio = [props.item?.surname, props.item?.name, props.item?.patronymic]
    .filter(Boolean)
    .join(" ");

  const inf = [
    props.item?.localityDeparture,
    props.item?.profession,
    props.item?.date,
  ]
    .filter(Boolean)
    .join(", ");

  const dispacth = useDispatch();
  const deleteHuman = (id: string): void => {
    setActivDeleteCard(false);
    OstarbaitersDelete(id).then((resp: any) => {
      if (resp.status === 200) {
        console.log(resp);
        apiOstarbaiters().then((req) => {
          if (req?.status === 200) {
            dispacth(apiGetPeople({ ostarbaiters: req.data?.ostarbaiters }));
            console.log("req.data", req.data.ostarbaiters);
          }
        });
      }
    });
  };

  const navigate = useNavigate();
  const routeEdit = (ids: string) => {
    dispacth(setSelectedPerson({ id: ids }));
    navigate("/AdminPage/EditHumanModule");
  };

  const funcardClick = () => {
    console.log(props.item?.id);
    dispacth(setSelectedPerson({ id: props.item?.id }));
    navigate(`/AdminPage/HumanProfile`);
  };

  return (
    <div className={styles.CardAdminMainBlock}>
      <div className={styles.CardAdmin}>
        <div className={styles.CardAdminImg}>
          <DeleteIMG
            className={styles.CarrdDelite}
            onClick={() => setActivDeleteCard(true)}
          />
          <Link to="../../AdminPage/HumanProfile">
          <img
            src={
              props.item?.img
                ? `${server}/${props.item?.img}`
                : `${notFoto}`
            }
            alt="man"
          />
          </Link>
          <EditIMG
            onClick={() => routeEdit(props.item.id)}
            className={styles.CarrdEdit}
          />
        </div>
        <div className={styles.cardText}>
          <span className={styles.name}>{fio}</span>
          <span className={styles.info}>{inf}</span>
        </div>
      </div>
      {activDeleteCard && (
        <div className={styles.DeleteCard}>
          <div>
            <div className={styles.text}>
              <p>Удалить карточку?</p>
            </div>
            <div className={styles.button}>
              <div className={styles.button__inner}>
                <button onClick={() => deleteHuman(props.item.id)}>Да</button>
                <button onClick={() => setActivDeleteCard(false)}>Нет</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardAdmin;
