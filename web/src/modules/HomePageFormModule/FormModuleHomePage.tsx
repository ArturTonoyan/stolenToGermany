import Form from "../../components/Form/Form";
import styles from "./FormModuleHomePage.module.scss";
function FormModuleHomePage(props: any) {
  return (
    <div className={styles.FormModuleHomePage}>
      <div className={styles.FormModuleHomePage__Input}>
        <div className={styles.FormModuleHomePage__Tile}>
          <h1>
            Поиск информации об угнанных на принудительные работы в нацистскую
            Германию жителей Ростовской области в годы Великой Отечественной
            войны 1941-1945 гг.:
          </h1>
          <Form isFunction={true} funUpdatePeop={props.funUpdatePeop} />
        </div>
      </div>
    </div>
  );
}

export default FormModuleHomePage;
