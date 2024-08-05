import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Input.module.scss";
import { openClodeAction } from "../../store/basic/action.slice";
import { RootState } from "../../store/store";
function Input(props: any) {
  const dispatch = useDispatch();
  const isActionOpen = useSelector((state: RootState) => state.actionSlice.action);

  const handleImgClick = () => {
    dispatch(openClodeAction()); // Dispatch the openAction to update the state to true when the image is clicked
  };

  return (
    <div className={styles.Input}>
      <input
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        className={styles.input}
        onChange={(el) => props.funOnChange(el)}
      ></input>
      <img onClick={handleImgClick} src={!isActionOpen ? "./../../img/param.svg" : "../../img/Close.svg"} alt="filter" />
    </div>
  );
}

export default Input;
