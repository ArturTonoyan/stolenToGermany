import { ChangeEvent, useState } from "react";
import Input from "../../ui/Input/Input";
import styles from "./AdminPanelModule.module.scss";
import Form from "../../components/Form/Form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CreateHuman from "../../components/CreateHuman/CreateHuman";
function AdminPanelModule() {
    const [inpValue, setInpValue] = useState<string>("");

    const funOnChange = (text: string): void => {
      setInpValue(text);
    };
    const store = useSelector((state: RootState) => state.peopleSlice);
    const isActionOpen = useSelector((state: RootState) => state.actionSlice.action);
  return (
    <div className={styles.AdminPanelModule}>
        <div className={styles.search}>
            <h1>Поиск для редактирования существующей информации:</h1>
            <div className={styles.search__inner}>
                <Input
                    type="text"
                    placeholder={"Фамилия, Имя, Отчество, год рождения"}
                    value={inpValue}
                    funOnChange={(e: ChangeEvent<HTMLInputElement>) =>
                    funOnChange(e.target.value)
                    }
                />
                {!isActionOpen && <button>НАЙТИ</button>}
              
            </div>
            <div>
                {isActionOpen &&
                    <div className={styles.filter}>
                    <Form/>
                    </div>
                }
            </div>
            <div>
                <CreateHuman/>
            </div>
        </div>
       
    </div>

  );
}

export default AdminPanelModule;
