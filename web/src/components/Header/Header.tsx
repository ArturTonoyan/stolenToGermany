import React from "react";
import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";

function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.headerInner}>
        <Logo />
        <ul>
          <li>Главная</li>
          <li>Поиск</li>
          <li>Крата</li>
          <li>О проекте</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
