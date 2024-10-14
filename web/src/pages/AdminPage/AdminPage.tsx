import styles from "./AdminPage.module.scss";
import { Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <div className={styles.AdminPage}>
      <Outlet />
    </div>
  );
}

export default AdminPage;
