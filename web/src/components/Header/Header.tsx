import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const [hrefName, setHrefName] = React.useState("");
  React.useEffect(() => {
    setHrefName(pathname.split("/").pop() || "");
  }, [pathname]);

  return (
    <header className={styles.Header}>
      <div className={styles.headerInner}>
        <Logo />
        <ul>
          <li className={hrefName === "" ? styles.active : ""}>
            <Link to="/">Главная</Link>
          </li>
          <li className={hrefName === "SearchPage" ? styles.active : ""}>
            <Link to="SearchPage">Поиск</Link>
          </li>
          <li className={hrefName === "MapPage" ? styles.active : ""}>
            <Link to="MapPage">Крата</Link>
          </li>
          <li className={hrefName === "#" ? styles.active : ""}>
            <Link to="#">О проекте</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
