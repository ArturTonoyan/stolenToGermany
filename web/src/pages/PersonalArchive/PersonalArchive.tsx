import styles from "./PersonalArchive.module.scss";
function PersonalArchive() {
  return (
    <div className={styles.PersonalArchive}>
      <img
        className={styles.BgImgCardHuman}
        src="./../../img/CardHumanBg.png"
        alt="Bg"
      />
      <div className={styles.container}>
        <img className={styles.pageArrow} src="./img/pageArrow.svg" alt="<" />
        <div className={styles.slider}>
          <button>
            <img src="./img/arrowLeft.svg" alt="<" />
          </button>
          <img src="./img/arhiv.png" alt="foto" />
          <button>
            <img
              style={{ transform: "rotate(-180deg)" }}
              src="./img/arrowLeft.svg"
              alt=">"
            />
          </button>
        </div>
        <div className={styles.styderPoints}>
          <ul>
            <li className={styles.active}></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div className={styles.imgs}>
        <ul>
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <img className={styles.lupa} src="./img/lupa.svg" alt="l" />
                <img src="./img/arhiv.png" alt="a" />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default PersonalArchive;
