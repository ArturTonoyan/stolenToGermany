import { useEffect, useState } from "react";
import styles from "./HeaderAdmin.module.scss";
import Logo from "../Logo/Logo";
import { Link, useLocation } from "react-router-dom";

function HeaderAdmin(props: any) {
  const { pathname } = useLocation();
  const [hrefName, setHrefName] = useState("");
  useEffect(() => {
    setHrefName(pathname.split("/").pop() || "");
  }, [pathname]);

  const handleLinkClick = () => {
    window.scrollTo({ top: 1020, behavior: "smooth" }); // Прокрутка страницы на 500px от верха с плавным эффектом
  };

  useEffect(() => {
    //! записываем всех людей в редукс
    // props.funUpdatePeople();

    //! записываем данные карты
    props.funUpdateCamps();
  }, []);

  return (
    <header className={styles.HeaderAdmin}>
      <div className={styles.headerInner}>
        <Logo />
        <ul>
          <li className={hrefName === "" ? styles.active : ""}>
            <Link to="/">Главная</Link>
          </li>
          <li className={hrefName === "AdminSearchResult" ? styles.active : ""}>
            <Link to="AdminPage/AdminSearchResult">Поиск</Link>
          </li>
          <li className={hrefName === "AdminPanelModule" ? styles.active : ""}>
            <Link to="AdminPage/AdminPanelModule">Добавить человека</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default HeaderAdmin;
