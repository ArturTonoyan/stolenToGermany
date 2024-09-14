import { useEffect, useState } from "react";
import styles from "./AdminPage.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { apiCheckAuthorization } from "../../api/ApiRequest";

function AdminPage(props: any) {
  const [action, setAction] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    apiCheckAuthorization().then((res) => {
      if (res?.status === 200) {
        console.log("авторизован", res);
        setAction(true);
      } else {
        setAction(false);
      }
    });
  });
  useEffect(() => {
    console.log("admin", props.loc);
    if (props.loc === "/AdminPage/AdminPageAuth" && action) {
      navigate("/AdminPage/AdminPanelModule");
    }
    if (
      props.loc.includes("AdminPage") &&
      !action &&
      props.loc !== "/AdminPage/AdminPageAuth"
    ) {
      navigate("/AdminPage/AdminPageAuth");
    }
  }, [props.loc, action]);

  return (
    <div className={styles.AdminPage}>
      <Outlet />
    </div>
  );
}

export default AdminPage;
