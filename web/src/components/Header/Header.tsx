import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiGetCamps, apiOstarbaiters } from "../../api/ApiRequest";
import { apiGetPeople } from "../../store/basic/people.slice";
import { setCamps } from "../../store/basic/camps.slice";

function Header() {
  const { pathname } = useLocation();
  const [hrefName, setHrefName] = useState("");
  useEffect(() => {
    setHrefName(pathname.split("/").pop() || "");
  }, [pathname]);

  const handleLinkClick = () => {
    window.scrollTo({ top: 1020, behavior: "smooth" }); // Прокрутка страницы на 500px от верха с плавным эффектом
  };

  const dispacth = useDispatch();
  useEffect(() => {
    //! записываем всех людей в редукс
    apiOstarbaiters().then((req) => {
      if (req?.status === 200) {
        dispacth(apiGetPeople({ ostarbaiters: req.data?.ostarbaiters }));
        console.log("req.data", req.data.ostarbaiters);
      }
    });

    //! записываем данные карты
    apiGetCamps().then((req) => {
      console.log("карта", req);
      if (req?.status === 200) {
        dispacth(setCamps({ camps: req.data?.camps }));
      }
    });
  }, []);

  return (
    <header className={styles.Header}>
      <div className={styles.headerInner}>
        <Logo />
        <ul>
          <li className={hrefName === "" ? styles.active : ""}>
            <Link to="/">Главная</Link>
          </li>
          <li
            className={
              hrefName === "SearchPage" ||
              hrefName === "HumanProfile" ||
              hrefName === "PersonalArchive" ||
              hrefName === "SearchModule"
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
            <Link to="/" onClick={handleLinkClick}>
              О проекте
            </Link>
          </li>
          <li className={hrefName === "#" ? styles.active : ""}>
            <Link to="/AdminPage/AdminPageAuth">Админка</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
