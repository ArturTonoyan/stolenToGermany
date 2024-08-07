import React from "react";
import Form from "../../components/Form/Form";
import FormModuleHomePage from "../../module/FormModuleHomePage/FormModuleHomePage";
import SliderModule from "../../module/SliderModule/SliderModule";
import styles from "./HomePage.module.scss";
import Footer from "../../components/Footer/Footer";
function HomePage() {
  return(
    <div className={styles.HomePage}>
      <div className={styles.HomePage__firstBlock}>
        <FormModuleHomePage />
        <SliderModule/>
      </div>
      <img className={styles.sliderImg}  src="./img/sliderImg.png" />
      <img className={styles.sliderImg2}  src="./img/sliderImg2.png" />
      <img className={styles.HomePage__bg1}  src="./img/bgMain1.png" />
      <img  className={styles.BgAboutHomeLeft} src="./img/BgAboutHomeLeft.png"/>
      <div className={styles.about}>
        <div className={styles.about_inner}>
          <h3>О проекте</h3>
          <p>С мая 2015 года работает информационная система «Память народа» (электронный паспорт зарегистрирован на официальном сайте Федеральной государственной информационной системы координации информации (ФГИС КИ). Система объединяет все ранее созданные нами общедоступные банки данных «Мемориал» и «Подвиг народа в Великой Отечественной войне 1941–1945 годов», содержащие сведения об участниках Великой Отечественной войны, вернувшихся с фронтов Победителями, о погибших и пропавших без вести, их подвигах и награждениях. Все сведения объединены в единую информационную интерактивную систему с возможностью подбора документов и восстановления истории службы воина.</p>
          <h5>В результате выполненной работы ИС «Память народа» содержит:</h5>
          <ul>
            <li>свыше 109 млн. оцифрованных страниц архивных документов, общим объемом 135 терабайт;</li>
            <li>67 млн. записей из 25 млн. цифровых копий документов о безвозвратных потерях Красной армии, военно-пересыльных пунктов и запасных полков;</li>
            <li>более 79 000 паспортов воинских захоронений;</li>
            <li>более 41 млн. записей документов по награждениям;</li>
            <li>около 51 800 исторических карт и схем боевых действий штабов фронтов, армий и дивизий, 12,5 млн. записей с информацией на картах о совершенных подвигах солдат и офицеров;</li>
            <li>27 млн. записей из карточек о ранениях и умерших от ран в госпиталях и медсанбатах;</li>
            <li>описание 227 крупнейших сражений Великой Отечественной войны.</li>
          </ul>
          </div>
      </div>
      <img  className={styles.BgAboutHomeRight} src="./img/BgAboutHomeRight.png"/>
    </div>
  )
}

export default HomePage;
