import { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();
  const [hrefName, setHrefName] = useState("");
  useEffect(() => {
    setHrefName(pathname.split("/").pop() || "");
  }, [pathname]);

  const handleLinkClick = () => {
    window.scrollTo({ top: 1020, behavior: 'smooth' }); // Прокрутка страницы на 500px от верха с плавным эффектом
  };
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_innerTop}>
        <div>
          <img src="./../../img/logoFooter.svg"/>
        </div>
        <div>
        <ul>
          <li className={hrefName === "" ? styles.active : ""}>
            <Link to="/">Главная</Link>
          </li>
          <li
            className={
              hrefName === "SearchPage" || hrefName === "HumanProfile"
                ? styles.active
                : ""
            }
          >
            <Link to="SearchPage/SearchModule">Поиск</Link>
          </li>
          <li className={hrefName === "MapPage" ? styles.active : ""}>
            <Link to="MapPage">Крата</Link>
          </li>
          <li className={hrefName === "#" ? styles.active : ""}>
            <Link to="/" onClick={handleLinkClick}>О проекте</Link>
          </li>
        </ul>
        </div>
        <div className={styles.footer__mesagers}>
          <img src="./../../img/vk.png"/>
          <img src="./../../img/tg.png"/>
        </div>
        
      </div>
      <div className={styles.footer_innerBottom}>
        <p>© Все права защищены</p>
      </div>
    </footer>
  );
}

export default Footer;
