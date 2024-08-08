import styles from "./CardAdmin.module.scss"
import {ReactComponent as DeleteIMG} from "../../imgs/delete.svg"
import {ReactComponent as EditIMG} from "../../imgs/edit.svg"
import { useState } from "react";
import { Link } from "react-router-dom";
function CardAdmin() {

  const [activDeleteCard, setActivDeleteCard] = useState<boolean>(false);

  return (
    <div className={styles.CardAdminMainBlock}>
    <div className={styles.CardAdmin}>
      <div className={styles.CardAdminImg}>
        {/* <img src="./../../img/delete.svg" alt="man" /> */}
        <DeleteIMG  className={styles.CarrdDelite} onClick={()=>setActivDeleteCard(true)}/>
        <Link to="/SearchPage/HumanProfile"><img src="./../../img/man.png" alt="man" /></Link>
        <Link to="/AdminPage/EditHumanModule"><EditIMG className={styles.CarrdEdit} /></Link>
        {/* <img src="./../../img/edit.svg" alt="man" /> */}
    </div>
      <div className={styles.cardText}>
        <span className={styles.name}>Ирклиенко Михаил Иванович</span>
        <span className={styles.info}>г. Таганрог, рабочий, 1908 г.</span>
      </div>
    </div>
    {activDeleteCard 
    &&
    <div className={styles.DeleteCard}>
     <div>
       <div className={styles.text}>
           <p>Удалить карточку?</p>
       </div>
       <div className={styles.button}>
           <div className={styles.button__inner}>
               <button>Да</button>
               <button onClick={()=>setActivDeleteCard(false)}>Нет</button>
           </div>
       </div>
     </div>
   </div>
    }
     
   </div>
  );
}

export default CardAdmin;
