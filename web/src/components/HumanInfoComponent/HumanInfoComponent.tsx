import styles from "./HumanInfoComponent.module.scss";

function HumanInfoComponent(props: any) {
  return (
    <div className={styles.HumanInfoComponent}>
      <p
        onClick={() => props.funOpenFoto(props.type)}
        className={props.funGetClassActive(props.type)}
      >
        {props.text}
        <span>{props.data}</span>
      </p>
    </div>
  );
}

export default HumanInfoComponent;
