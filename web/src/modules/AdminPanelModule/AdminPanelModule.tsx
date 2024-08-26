import { ChangeEvent, useEffect, useState } from "react";
import Input from "../../ui/Input/Input";
import styles from "./AdminPanelModule.module.scss";
import Form from "../../components/Form/Form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CreateHuman from "../../components/CreateHuman/CreateHuman";
import { Person } from "../../store/basic/people.slice";
import { AddPhotoImg, OstarbaitersCreate } from "../../api/ApiRequest";
import { create } from "domain";
function AdminPanelModule() {
    const [inpValue, setInpValue] = useState<string>("");

    const funOnChange = (text: string): void => {
      setInpValue(text);
    };
    const store = useSelector((state: RootState) => state.peopleSlice);
    const isActionOpen = useSelector((state: RootState) => state.actionSlice.action);
//     const [filterHumen, setFilterHumen] = useState<Person[]>([]);
  
//     useEffect(() => {
//       setFilterHumen(store.people);
//     }, [store.people]);

//      //! при нажатии на кнопку найти
//   const serchPeople = () => {
//     setFilterHumen(
//       store.people.filter((person) =>
//         Object.values(person).some(
//           (value) =>
//             value !== null &&
//             value !== undefined &&
//             value.toString().toLowerCase().includes(inpValue.toLowerCase())
//         )
//       )
//     );
//   };
const createdHuman = (data: Person, photo: File, additionalFiles: File[]) => {
    OstarbaitersCreate(data).then((response) => {
        if(response?.status === 200) {
            const formData = {
                img: photo
            }
            console.log("photo", photo);
            console.log("formData", formData);
            AddPhotoImg(formData).then((resp) => {
                const respon = [
                        {
                            type: "create",
                            status: resp?.status,
                        }
                    ]
                   
                        return respon;
                    
            })
        }
    });
};

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
                <h1 className={styles.title}>Внести новые данные о человеке:</h1>
                <CreateHuman funcCreate={createdHuman}/>
            </div>
        </div>
       
    </div>

  );
}

export default AdminPanelModule;
