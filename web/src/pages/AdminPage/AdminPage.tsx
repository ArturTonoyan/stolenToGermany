import { useEffect } from "react";
import styles from "./AdminPage.module.scss";
import { Outlet } from "react-router-dom";
import { apiCheckAuthorization } from "../../api/ApiRequest";

function AdminPage() {
  useEffect(() => {
    apiCheckAuthorization().then((res) => {
      if (res?.status === 200) {
        console.log("авторизован", res);
      }
    });
  });
  return (
    <div className={styles.AdminPage}>
      <Outlet />
    </div>
  );
}

export default AdminPage;
