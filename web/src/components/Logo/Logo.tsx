import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.Logo}>
      <img src="./../../img/logo.svg" alt="logo" />
      <div className={styles.logoText}>
        <span>ОСТАРБАЙТЕРЫ</span>
        <span>OSTARBITERS</span>
      </div>
    </div>
  );
}

export default Logo;
