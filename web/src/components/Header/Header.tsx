import React from "react";
import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.headerInner}>
        <Logo />
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="SearchPage">Поиск</Link>
          </li>
          <li>
            <Link to="#">Крата</Link>
          </li>
          <li>
            <Link to="#">О проекте</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
