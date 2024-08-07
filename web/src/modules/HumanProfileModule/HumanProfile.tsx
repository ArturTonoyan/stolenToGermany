import Card from "../../components/Card/Card";
import styles from "./HumanProfile.module.scss";

function HumanProfile() {
  return (
  <div className={styles.HumanProfile}>
    <div className={styles.HumanProfile__inner}>
      <div className={styles.HumanProfile__card}>
        <img className={styles.BgImgCardHuman} src="./../../img/CardHumanBg.png" alt="Bg"/>
        <div>
          <img src="./../../img/man.png" alt="man"/>
        </div>
        <div className={styles.HumanProfile__card__info}>
          <div className={styles.HumanProfile__card__info__name}>
              <p>Ирклиенко</p>
              <p>Михаил</p> 
              <p>Иванович</p>
          </div>
          <p className={styles.HumanProfile__card__info__archiv}><span>Личный архив</span><img src="./../img/Archiv.svg" /></p>
        </div>
      </div>
      <div className={styles.HumanProfile__info}>
       <p className={styles.HumanProfile__info__link}>Год рождения  — <span>1908</span></p>
       <p>Профессия на момент отправки в Германию  — <span>Рабочий</span></p>
       <p className={styles.HumanProfile__info__link}>Адрес проживания до угона на принудительные работы в Германию  — <span>информация отсутсвует</span></p>
       <p>Дата угона на принудительные работы в Германию  — <span>информация отсутсвует</span></p>
       <p className={styles.HumanProfile__info__link}>Населенный пункт откуда угнан на принудительные работы  — <span></span>информация отсутсвует</p>
       <p>Место трудоиспользования на принудительных работах в Германии  — <span>информация отсутсвует</span></p>
       <p className={styles.HumanProfile__info__link}>Дата, место и причина смерти на момент пребывания в Германии  — <span>информация отсутсвует</span></p>
       <p className={styles.HumanProfile__info__link}>Дата и место репатриации  — <span>информация отсутсвует</span></p>
       <p className={styles.HumanProfile__info__link}>Адрес проживания после возвращения в СССР  — <span>информация отсутсвует</span></p>
      </div>
    </div>
  </div>
  )
}

export default HumanProfile;
