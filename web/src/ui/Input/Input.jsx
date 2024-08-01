import React from "react";
import styles from "./Input.module.scss";

function Input(props) {
  // const [inpValue, setInpValue] = useState(null);
  // const funOnChange = (el) => {
  //     setInpValue(el.target.value);
  //   };
  //   <Input
  //   type="text"
  //   placeholder={"Введите текст..."}
  //   value={inpValue}
  //   funOnChange={funOnChange}
  // />

  return (
    <div className={styles.Input}>
      <input
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        className={styles.input}
        onChange={(el) => props.funOnChange(el)}
      ></input>
      <img src="./img/param.svg" alt="fitler" />
    </div>
  );
}

export default Input;
