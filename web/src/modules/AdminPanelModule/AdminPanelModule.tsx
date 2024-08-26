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
import { Link } from "react-router-dom";
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
    // OstarbaitersCreate(data).then((response) => {
    //     if (response?.status === 200) {
    //         const formData = new FormData();
    //         formData.append('image', photo); // Ensure the key matches the backend

    //         AddPhotoImg(formData).then((resp) => {
    //             const respon = [
    //                 {
    //                     type: "create",
    //                     status: resp?.status,
    //                 }
    //             ];
    //             return respon;
    //         });
    //     }
    // });
    const formData = new FormData();
    formData.append('image', photo);
    AddPhotoImg(formData).then((resp) => {
        const respon = [
            {
                type: "create",
                status: resp?.status,
            }
        ];
        return respon;
    });
};


  return (
    <div className={styles.AdminPanelModule}>
        <div className={styles.search}>
            <div>
                <h1 className={styles.title}>Внести новые данные о человеке:</h1>
                <CreateHuman funcCreate={createdHuman}/>
                <div className={styles.Button}>
                    <Link to="/AdminPage/AdminSearchResult"><button>Редактирование существующей информации</button></Link>
                </div>
            </div>
        </div>
       
    </div>

  );
}

export default AdminPanelModule;
