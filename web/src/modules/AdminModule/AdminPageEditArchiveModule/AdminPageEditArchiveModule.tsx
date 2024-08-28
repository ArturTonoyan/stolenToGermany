import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { apiGetOstarbaiter } from "../../../api/ApiRequest";
import styles from "./AdminPageEditArchiveModule.module.scss";
import { Link } from "react-router-dom";
import CardArchive from "../../../components/CardArchive/CardArchiveNotData";
import CardArchiveNotData from "../../../components/CardArchive/CardArchiveNotData";
function AdminPageEditArchiveModule(props: any) {
    const store = useSelector((state: RootState) => state.peopleSlice);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        console.log("store", store.selectedPerson)
        apiGetOstarbaiter(store.selectedPerson).then((res) => {
          setData(res && res?.data?.ostarbaiter);  
        });
    },[])
    useEffect(() => {
        console.log("data", data)
    }, [data])

    return ( 
        <div className={styles.AdminPageEditArchiveModule}>
            <div className={styles.AdminPageEditArchiveModuleInner}>
            <Link to="/AdminPage/AdminPanelModule">
                {" "}
                <img
                className={styles.ArrowBack}
                src="./../img/pageArrow.svg"
                alt="<"
                />{" "}
            </Link>
                <h1 className={styles.title}>Редактирование личного архива:</h1>
                <CardArchiveNotData dataHuman={data}/>
            </div>
        </div>
     );
}

export default AdminPageEditArchiveModule;