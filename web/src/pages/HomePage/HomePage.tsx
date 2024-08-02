import React from "react";
import Form from "../../components/Form/Form";
import FormModuleHomePage from "../../module/FormModuleHomePage/FormModuleHomePage";
import SliderModule from "../../module/SliderModule/SliderModule";
import styles from "./HomePage.module.scss";
function HomePage() {
  return(
    <div className={styles.HomePage}>
      <div className={styles.HomePage__firstBlock}>
        <FormModuleHomePage />
        <SliderModule/>
      </div>
    </div>
  )
}

export default HomePage;
